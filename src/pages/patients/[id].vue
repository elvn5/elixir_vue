<template>
  <v-container>
    <v-row
      class="pa-2 gap-2 justify-space-between align-center"
    >
      <p class="text-h2 pb-2">
        Пациент #123
      </p>
      <v-btn
        variant="outlined"
        @click="attachDoctorDialog = true"
      >
        Закрепить врача
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
        <v-card
          elevation="2"
          class="mx-auto"
        >
          <v-card-title class="text-h6 d-flex justify-space-between align-center">
            Детали пациента
            <v-chip
              color="green"
            >
              Оплачен
            </v-chip>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-img
              max-width="100%"
              aspect-ratio="1"
              src="https://www.alleycat.org/wp-content/uploads/2019/03/FELV-cat.jpg"
              class="pb-2"
            />


            <v-row dense>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Имя:</strong> {{ patient.name }}
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Пол:</strong> {{ patient.gender }}
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Дата рождения:</strong> {{ formatDate(patient.dob) }}
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Телефон:</strong> {{ patient.phone }}
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Email:</strong> {{ patient.email }}
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Адрес:</strong> {{ patient.address }}
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <strong>Полис / Док. ID:</strong> {{ patient.documentId }}
              </v-col>
            </v-row>
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

        <!-- 📝 Модальное окно редактирования -->
        <v-dialog
          v-model="dialog"
          max-width="600px"
        >
          <v-card>
            <v-card-title>Редактирование пациента</v-card-title>
            <v-divider />
            <v-card-text>
              <v-form
                ref="formRef"
                @submit.prevent="saveChanges"
              >
                <v-row dense>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.name"
                      label="Имя"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-select
                      v-model="form.gender"
                      label="Пол"
                      :items="['Мужской', 'Женский']"
                      required
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.dob"
                      label="Дата рождения"
                      type="date"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.phone"
                      label="Телефон"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.address"
                      label="Адрес"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.documentId"
                      label="Полис / Док. ID"
                    />
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                text
                @click="dialog = false"
              >
                Отмена
              </v-btn>
              <v-btn
                color="primary"
                @click="saveChanges"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col
        cols="12"
        md="8"
      >
        <v-tabs
          v-model="tab"
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
          <v-tab value="keeps">
            Медицинские заметки
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="history">
            <v-text-field
              placeholder="Поиск..."
              class="mb-2"
            />
            <div v-if="patientHistory.data">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-left">
                      Дата посещение
                    </th>
                    <th class="text-left">
                      Сотрудник
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
                    <td>{{ visit.staff.full_name }}</td>
                    <td>{{ visit.staff.role }}</td>
                  </tr>
                </tbody>
              </v-table>
            </div>
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
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ new Date().toLocaleDateString("en-US", {}) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Не любит котов
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-tabs-window-item>
          <v-tabs-window-item value="keeps">
            <v-expansion-panels multiple>
              <v-expansion-panel>
                <v-expansion-panel-title>
                  {{ new Date().toLocaleDateString("en-US", {}) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  Хороший пациент
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
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
      <v-card-title>Закрепить пациента ###</v-card-title>
      <v-divider />
      <v-container>
        <v-select
          :items="doctors"
          label="Выбрать врача"
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
import { reactive, ref } from "vue";
import { usePatientHistory } from "@/stores/patient-history";
import dayjs from "dayjs";

const dialog = ref(false)
const attachDoctorDialog = ref(false)
const patientHistory = usePatientHistory();

const doctors = [
  "1",
  "2",
  "3",
]

onMounted(()=> {
  patientHistory.fetchHistory()
})

const patient = reactive({
  name: 'Иван Иванов',
  gender: 'Мужской',
  dob: '1985-05-20',
  phone: '+7 (900) 123-45-67',
  email: 'ivanov@example.com',
  address: 'г. Москва, ул. Ленина, д. 10',
  documentId: '1234 567890',
})

// Форма редактирования
const form = reactive({ ...patient })

const formatDate = (dateStr:string) => {
  return new Date(dateStr).toLocaleDateString('ru-RU')
}

const saveChanges = () => {
  Object.assign(patient, form)
  dialog.value = false
}

const tab = ref(null);
</script>

<style scoped>
strong {
  display: inline-block;
  min-width: 100px;
}
</style>
