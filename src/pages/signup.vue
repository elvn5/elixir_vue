<script setup lang="ts">
import { useForm } from "vee-validate";
import { randomUUID, signUpSchema } from "@/utils";
import { toTypedSchema } from "@vee-validate/zod";
import { useSignUpStore } from "@/stores";

const { signUp } = useSignUpStore()
const formId = randomUUID();

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(signUpSchema),
})

const [email, emailAttr] = defineField("email")
const [pass, passAttr] = defineField("password")
const [confirmPass, confirmPassAttr] = defineField("confirmPassword")


const onSubmit = handleSubmit(async data => {
  void signUp(data)
});

</script>

<template>
  <v-container
    :key="formId"
    class="wrapper"
  >
    <v-sheet
      class="mx-auto form"
      width="300"
    >
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          v-bind="emailAttr"
          id="email"
          v-model="email"
          label="E-Mail"
          :error-messages="errors.email"
          required
        />
        <v-text-field
          v-model="pass"
          v-bind="passAttr"
          label="Пароль"
          type="password"
          :error-messages="errors.password"
          required
        />
        <v-text-field
          v-model="confirmPass"
          v-bind="confirmPassAttr"
          label="Повторите пароль"
          type="password"
          :error-messages="errors.confirmPassword"
          required
        />
        <v-btn
          class="mx-auto w-100"
          type="submit"
        >
          Зарегистрироваться
        </v-btn>

        <router-link to="/auth">
          <v-btn
            class="mx-auto w-100 mt-2"
            variant="text"
          >
            Войти
          </v-btn>
        </router-link>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
}

.form {
  padding: 1rem;
}
</style>


<route>
{
meta: {
layout: "auth"
}
}
</route>
