<template>
  <v-container>
    <v-row
      class="d-flex pa-2 gap-2 justify-space-between align-center"
    >
      <ApiStateWrapper
        :loading="patientInfo.loading"
        :error="patientInfo.error"
      >
        <p class="text-h2 pb-2">
          {{ patientInfo?.data?.full_name }}
        </p>
      </ApiStateWrapper>
      <v-btn
        v-if="patientInfo?.data?.attached_doctor_id"
        variant="outlined"
        @click="removeDoctor"
      >
        Убрать врача
      </v-btn>
      <v-btn
        v-if="!patientInfo?.data?.attached_doctor_id"
        variant="outlined"
        @click="attachDoctorDialog = true"
      >
        Назначить врача
      </v-btn>
    </v-row>
    <v-row
      class="patient-profile"
      dense
    >
      <v-col
        cols="12"
        md="4"
      >
        <ApiStateWrapper
          :loading="patientInfo.loading"
          :error="patientInfo.error"
        >
          <v-card
            elevation="2"
            class="mx-auto"
          >
            <v-card-title class="text-h6 d-flex justify-space-between align-center">
              Детали пациента
              <v-chip
                :color="patientInfo?.data?.payment_status === 'paid' ? 'green' : 'red'"
              >
                {{ formatEnum(patientInfo?.data?.payment_status) }}
              </v-chip>
            </v-card-title>

            <v-divider />

            <v-card-text>
              <v-list>
                <v-list-item>
                  <strong>Имя:</strong> {{ patientInfo?.data?.full_name }}
                </v-list-item>
                <v-list-item>
                  <strong>Пол:</strong> {{ patientInfo?.data?.gender }}
                </v-list-item>
                <v-list-item>
                  <strong>Дата рождения:</strong> {{ formatBirthday(patientInfo?.data?.birth_date) }}
                </v-list-item>
                <v-list-item>
                  <strong>Телефон:</strong> {{ patientInfo?.data?.phone }}
                </v-list-item>
                <v-list-item>
                  <strong>Email:</strong> {{ patientInfo?.data?.email }}
                </v-list-item>
                <v-list-item>
                  <strong>Адрес:</strong> {{ patientInfo?.data?.address }}
                </v-list-item>
                <v-list-item>
                  <strong>Полис / Док. ID:</strong> {{ patientInfo?.data?.document_id }}
                </v-list-item>
                <v-divider
                  v-if="patientInfo?.data?.attached_doctor"
                  thickness="3"
                  class="border-opacity-100"
                  color="success"
                />
                <v-list-item v-if="patientInfo?.data?.attached_doctor">
                  <strong>Лечащий врач:</strong> {{ patientInfo?.data?.attached_doctor.full_name }}
                </v-list-item>
                <v-list-item v-if="patientInfo?.data?.attached_doctor">
                  <strong>Номер врача:</strong> {{ patientInfo?.data?.attached_doctor.phone }}
                </v-list-item>
                <v-list-item v-if="patientInfo?.data?.attached_doctor">
                  <strong>E-Mail врача:</strong> {{ patientInfo?.data?.attached_doctor.email }}
                </v-list-item>
              </v-list>
            </v-card-text>


            <v-card-actions>
              <v-spacer />
              <v-btn
                color="primary"
                @click="dialog = true"
              >
                Редактировать
              </v-btn>
            </v-card-actions>
          </v-card>
        </ApiStateWrapper>

        <!-- 📝 Модальное окно редактирования -->
        <edit-patient v-model:dialog="dialog" />
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-tabs
          v-model="activeTab"
          class="mb-2"
          grow
          show-arrows
        >
          <v-tab value="history">
            История посещений
          </v-tab>
          <v-tab value="media">
            Медиафайлы
          </v-tab>
          <v-tab value="specification">
            Особенности
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item value="history">
            <ApiStateWrapper
              :loading="patientHistory.loading"
              :error="patientHistory.error"
            >
              <div v-if="patientHistory.data">
                <v-table>
                  <thead>
                    <tr>
                      <th class="text-left">
                        Дата посещение
                      </th>
                      <th class="text-left">
                        Врач
                      </th>
                      <th class="text-left">
                        Роль
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="visit in patientHistory.data"
                      :key="visit.id"
                    >
                      <td>{{ formatDate(visit.visit_date) }}</td>
                      <td>{{ visit.staff?.full_name }}</td>
                      <td>{{ visit.staff?.role }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </div>
            </ApiStateWrapper>
          </v-tabs-window-item>
          <v-tabs-window-item value="media">
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ new Date().toLocaleDateString("en-US", {}) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <v-img src="https://www.fdoctor.ru/upload/iblock/501/rentgen_grudnoy_kletki.jpg" />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-tabs-window-item>

          <v-tabs-window-item value="specification">
            <ApiStateWrapper
              :loading="patientInfo.loading"
              :error="patientInfo.error"
            >
              <v-list>
                <v-list-item>
                  Аллергия: {{ patientInfo?.data?.allergies || "-" }}
                </v-list-item>
                <v-list-item>
                  Противопоказания: {{ patientInfo?.data?.contraindications || "-" }}
                </v-list-item>
                <v-list-item>
                  Импланты: {{ patientInfo?.data?.implants || "-" }}
                </v-list-item>
              </v-list>
            </ApiStateWrapper>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog
    v-model="attachDoctorDialog"
    max-width="600px"
  >
    <v-card>
      <v-card-title>Закрепить пациента {{ patientInfo?.data?.full_name }}</v-card-title>
      <v-divider />
      <v-container>
        <v-select
          v-model="selectedDoctor"
          :items="doctorsList"
          label="Выбрать врача"
          item-title="name"
          item-value="id"
        />
      </v-container>
      <v-card-actions>
        <v-spacer />
        <v-btn
          text
          @click="attachDoctorDialog = false"
        >
          Отмена
        </v-btn>
        <v-btn
          color="primary"
          @click="saveChanges"
        >
          Закрепить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useAttachDoctor, useAvailableDoctors, useDetachDoctor, usePatientHistory, usePatientInfo } from "@/stores";
import ApiStateWrapper from "@/components/ApiStateWrapper.vue";
import { formatBirthday, formatDate, formatEnum } from "@/utils";
import EditPatient from "@/features/edit-patient/EditPatient.vue";
import type { IdRouteParams } from "@/types";


const router = useRouter();
const route = useRoute() as IdRouteParams;
const TAB_QUERY_PARAM = 'tab';
const activeTab = ref<string>(route.query[TAB_QUERY_PARAM] as string || 'history');

const dialog = ref(false)
const attachDoctorDialog = ref(false)
const patientHistory = usePatientHistory();
const patientInfo = usePatientInfo()
const doctors = useAvailableDoctors()
const attachDoctor = useAttachDoctor()
const detachDoctor = useDetachDoctor()
const selectedDoctor = shallowRef<string | null>(null)

const doctorsList = computed(()=> {
  if(doctors.data && doctors?.data.length > 0) {
    return doctors?.data.map((doctor) => {
      return {
        id: doctor.id,
        name: doctor.full_name,
      }
    })
  }

  return [];

})

watch(activeTab, (newTab) => {
  router.replace({
    query: {
      ...route.query,
      [TAB_QUERY_PARAM]: newTab,
    },
  });
});

watch(
  () => route.query[TAB_QUERY_PARAM],
  (newTab) => {
    if (typeof newTab === 'string') {
      activeTab.value = newTab;
    }
  }
);

onMounted(()=> {
  patientHistory.fetch(route.params.id);
  patientInfo.fetch(route.params.id);
  doctors.fetch();
})

const removeDoctor = () => {
  detachDoctor.fetch(route.params.id)
}

const saveChanges = () => {
  if(selectedDoctor?.value) {
    const id = selectedDoctor.value;

    attachDoctor.fetch({ doctorId: id, patientId: route.params.id }).then(() => {
      patientInfo.fetch(route.params.id);
      attachDoctorDialog.value = false;
    })
  }
}
</script>

<style scoped>
strong {
  display: inline-block;
  min-width: 100px;
}
</style>
