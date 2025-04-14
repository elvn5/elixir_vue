<template>
  <v-container>
    <v-alert
      icon="mdi-eye"
    >
      <v-alert-title>Изменения где то что то как то</v-alert-title>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries
    </v-alert>
    <v-fab
      class="fab"
      :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' "
      elevation="2"
      @click="toggleTheme"
    />
  </v-container>
</template>

<script lang="ts" setup>

import { useTheme } from 'vuetify'

const theme = useTheme()

const isDark = computed(() => theme.global.name.value === "dark")

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

</script>

<style scoped>
.fab {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
