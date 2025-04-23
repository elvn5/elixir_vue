<template>
  <v-container class="py-6">
    <v-card
      elevation="2"
      class="mx-auto"
    >
      <v-card-title class="text-h5">
        Детали пациента
      </v-card-title>
      <v-divider />

      <v-card-text>
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
  </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const dialog = ref(false)

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
</script>

<style scoped>
strong {
  display: inline-block;
  min-width: 100px;
}
</style>
