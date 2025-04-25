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
    <v-row>
      <v-col cols="4">
        <v-card
          elevation="2"
          class="mx-auto"
        >
          <v-card-title class="text-h5 d-flex justify-space-between align-center">
            Детали пациента
            <v-chip
              color="green"
              append-icon="mdi-check"
            >
              Оплачен
            </v-chip>
          </v-card-title>

          <v-divider />

          <v-card-text>
            <v-img
              width="200px"
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
      <v-col cols="8">
        <v-tabs
          v-model="tab"
          class="mb-2"
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
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">
                    Name
                  </th>
                  <th class="text-left">
                    Calories
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in desserts"
                  :key="item.name"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.calories }}</td>
                </tr>
              </tbody>
            </v-table>
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

const dialog = ref(false)
const attachDoctorDialog = ref(false)

const doctors = [
  "1",
  "2",
  "3",
]

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

const desserts = [
  {
    name: 'Frozen Yogurt',
    calories: 159,
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
  },
  {
    name: 'Eclair',
    calories: 262,
  },
  {
    name: 'Cupcake',
    calories: 305,
  },
  {
    name: 'Gingerbread',
    calories: 356,
  },
  {
    name: 'Jelly bean',
    calories: 375,
  },
  {
    name: 'Lollipop',
    calories: 392,
  },
  {
    name: 'Honeycomb',
    calories: 408,
  },
  {
    name: 'Donut',
    calories: 452,
  },
  {
    name: 'KitKat',
    calories: 518,
  },
]
</script>

<style scoped>
.patients-wrapper {
display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

strong {
  display: inline-block;
  min-width: 100px;
}
</style>
