<template>
  <v-main>
    <v-app-bar :elevation="2">
      <template #prepend>
        <v-app-bar-nav-icon />
      </template>

      <v-app-bar-title>
        <router-link to="/">
          <v-img
            src="@/assets/logo.png"
            width="64px"
            height="64px"
          />
        </router-link>
      </v-app-bar-title>
      <template #append>
        <router-link
          v-if="isAuthenticated"
          to="/profile"
        >
          <v-btn
            icon="mdi-account"
          />
        </router-link>


        <v-btn
          v-if="isAuthenticated"
          icon="mdi-logout"
          @click="authStore.logout"
        />
        <router-link
          v-else
          to="/auth"
        >
          <v-btn icon="mdi-login" />
        </router-link>
      </template>
    </v-app-bar>
    <router-view />
  </v-main>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "@/stores";
  import { storeToRefs } from "pinia";

  const authStore = useAuthStore();

  const { isAuthenticated } = storeToRefs(authStore);

</script>
