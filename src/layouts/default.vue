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
        <router-link
          to="/profile"
          class="link"
          active-class="active"
        >
          <v-list-item
            prepend-avatar="https://avatar.iran.liara.run/public/15"
            :title="authStore.profileName"
          />
        </router-link>
      </v-list>


      <v-list
        density="compact"
        nav
      >
        <router-link
          v-for="navItem in navItems"
          :key="navItem.route"
          class="link"
          active-class="active"
          :to="navItem.route"
        >
          <v-list-item
            :prepend-icon="navItem.icon"
            :title="navItem.title"
          />
        </router-link>

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

  const navItems = [
    {
      title: "Расписание",
      icon: "mdi-clock-outline",
      route: "/schedule",
    },
    {
     title: "Пациенты",
      icon: "mdi-account-multiple",
      route: "/patients",
    },
    {
      title: "Платежи",
      icon: "mdi-cash",
      route: "/payments",
    },
    {
      title: "Напоминание",
      icon: "mdi-bell-alert-outline",
      route: "/reminders",
    },
  ]
</script>

<style lang="scss" scoped>
.link {
  text-decoration: none;
  color: inherit;
}

.active {
  color: cyan;
}

</style>
