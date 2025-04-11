<route>
{
  meta: {
    layout: "auth"
  }
}
</route>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { randomUUID, signInSchema } from "@/utils";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "@/stores";

const { login } = useAuthStore()

const formId = randomUUID()

const { handleSubmit, defineField, errors } = useForm({
  validationSchema: toTypedSchema(signInSchema),
})

const [username, usernameAttr] = defineField("username")
const [password, passwordAttr] = defineField("password")

const onSubmit = handleSubmit(data => {
  login(data)
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
          v-bind="usernameAttr"
          id="username"
          v-model="username"
          label="Имя пользователя"
          :error-messages="errors.username"
          required
        />
        <v-text-field
          v-model="password"
          v-bind="passwordAttr"
          label="Пароль"
          type="password"
          :error-messages="errors.password"
          required
        />
        <v-btn
          class="mx-auto w-100"
          type="submit"
        >
          Войти
        </v-btn>
      </v-form>
      <router-link to="/signup">
        <v-container class="d-flex justify-center">
          <v-btn variant="text">
            Зарегистрироваться
          </v-btn>
        </v-container>
      </router-link>
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

