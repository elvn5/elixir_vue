<template>
  <v-container>
    <v-btn
      class="mb-2"
      variant="outlined"
      @click="dialog = true"
    >
      Добавить пациента
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="60%"
    >
      <v-card>
        <v-card-title>Создание пациента</v-card-title>
        <v-divider />
        <v-card-text>
          <v-form
            ref="formRef"
            @submit.prevent="onSubmit"
          >
            <v-row dense>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-bind="nameAttr"
                  id="fullName"
                  v-model="fullName"
                  :error-messages="errors.full_name"
                  label="Имя"
                  required
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  id="gender"
                  v-model="gender"
                  v-bind="genderAttr"
                  :error-messages="errors.gender"
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
                  v-bind="birthAttr"
                  id="birth"
                  v-model="birth"
                  :error-messages="errors.birth_date"
                  label="Дата рождения"
                  type="date"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  id="phone"
                  v-model="phone"
                  v-bind="phoneAttr"
                  :error-messages="errors.phone"
                  label="Телефон"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-bind="emailAttr"
                  id="email"
                  v-model="email"
                  :error-messages="errors.email"
                  label="Email"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-bind="addressAttr"
                  id="address"
                  v-model="address"
                  :error-messages="errors.address"
                  label="Адрес"
                />
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-bind="docAttr"
                  id="doc"
                  v-model="doc"
                  :error-messages="errors.document_id"
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
            @click="emit('update:dialog', false)"
          >
            Отмена
          </v-btn>
          <v-btn
            color="primary"
            @click="onSubmit"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <ApiStateWrapper
      v-if="patients.data && patients.data.length > 0"
      :loading="patients.loading"
      :error="patients.error"
    >
      <v-list>
        <v-list-item
          v-for="patient in patients.data"
          :key="patient.id"
          @click="()=>goToDetails(patient.id)"
        >
          {{ patient.full_name }}
        </v-list-item>
      </v-list>
    </ApiStateWrapper>
  </v-container>
</template>

<script setup lang="ts">
import router from "@/router";
import { useCreatePatient, useEditPatient, usePatientInfo, usePatients } from "@/stores";
import type { IdRouteParams } from "@/types";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { EditPatientSchema } from "@/features/edit-patient/schema";

const dialog = ref(false);
const patients = usePatients()

onMounted(()=> {
  patients.fetch()
})

function goToDetails(id: string){
  router.push(`/patients/${id}?tab=history`);
}


const createPatient = useCreatePatient()
const patientInfo = usePatientInfo()
const route = useRoute() as IdRouteParams


const emit = defineEmits(['update:dialog']);
const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(EditPatientSchema),
})

const [email, emailAttr] = defineField("email")
const [fullName, nameAttr] = defineField("full_name")
const [gender, genderAttr] = defineField("gender")
const [birth, birthAttr] = defineField("birth_date")
const [phone, phoneAttr] = defineField("phone")
const [address, addressAttr] = defineField("address")
const [doc, docAttr] = defineField("document_id")

const onSubmit = handleSubmit(data => {
  createPatient.fetch(data).then(() => {
    emit('update:dialog', false)
    patientInfo.fetch(route.params.id)
  })
});

</script>

<style scoped>
strong {
  display: inline-block;
  min-width: 100px;
}

li {
  margin: 1rem;
}
</style>
