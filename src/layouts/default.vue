<template>
  <v-layout>
    <v-navigation-drawer
      expand-on-hover
      rail
      permanent
    >
      <router-link to="/">
        <v-img
          src="@/assets/logo.png"
          width="64px"
          height="64px"
        />
      </router-link>
      <v-divider />

      <v-list>
        <router-link to="/profile">
          <v-list-item
            prepend-avatar="https://avatar.iran.liara.run/public/15"
            title="Ermek"
          />
        </router-link>
      </v-list>


      <v-list
        density="compact"
        nav
      >
        <v-list-item
          prepend-icon="mdi-logout"
          title="Выйти"
          @click="authStore.logout"
        />
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  import { useAuthStore } from "@/stores";

  const authStore = useAuthStore();


</script>
