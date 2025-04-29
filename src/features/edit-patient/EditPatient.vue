<template>
  <v-dialog
    :model-value="dialog"
    max-width="600px"
    @update:model-value="val => emit('update:dialog', val)"
  >
    <v-card>
      <v-card-title>Редактирование пациента</v-card-title>
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
</template>

<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { EditPatientSchema } from "@/features/edit-patient/schema";
import { useEditPatient, usePatientInfo } from "@/stores";
import type { IdRouteParams } from "@/types";

const props = defineProps({
  dialog: Boolean
})

const editPatient = useEditPatient()
const patientInfo = usePatientInfo()
const route = useRoute() as IdRouteParams


const emit = defineEmits(['update:dialog']);
const { handleSubmit, defineField, errors, setFieldValue, resetForm } = useForm({
  validationSchema: toTypedSchema(EditPatientSchema),
})

watch(
  () => props.dialog,
  (isOpen) => {
    if (isOpen && patientInfo?.data) {
      const patient = patientInfo.data
      setFieldValue("email", patient.email || "")
      setFieldValue("full_name", patient.full_name || "")
      setFieldValue("gender", patient.gender || "")
      setFieldValue("birth_date", patient.birth_date || "")
      setFieldValue("phone", patient.phone || "")
      setFieldValue("address", patient.address || "")
      setFieldValue("document_id", patient.document_id || "")
    }

    // Сброс формы при закрытии
    if (!isOpen) {
      resetForm()
    }
  }
)

const [email, emailAttr] = defineField("email")
const [fullName, nameAttr] = defineField("full_name")
const [gender, genderAttr] = defineField("gender")
const [birth, birthAttr] = defineField("birth_date")
const [phone, phoneAttr] = defineField("phone")
const [address, addressAttr] = defineField("address")
const [doc, docAttr] = defineField("document_id")

const onSubmit = handleSubmit(data => {
  editPatient.fetch({ ...data, id: route.params.id }).then(() => {
    emit('update:dialog', false)
    patientInfo.fetch(route.params.id)
  })
});

</script>
