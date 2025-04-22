<template>
  <v-container>
    <news
      title="Michael Jordan"
      icon="mdi-account"
      desc="Description of Michael Jordan"
      :on-click-details="()=>onClickNews(`123`)"
    />
    <news
      title="Michael Jordan"
      icon="mdi-account"
      desc="Description of Michael Jordan"
      :on-click-details="()=>onClickNews(`123`)"
    />
    <news
      title="Michael Jordan"
      icon="mdi-account"
      desc="Description of Michael Jordan"
      :on-click-details="()=>onClickNews(`123`)"
    />
    <news
      title="Michael Jordan"
      icon="mdi-account"
      desc="Description of Michael Jordan"
      :on-click-details="()=>onClickNews(`123`)"
    />
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
import News from "@/components/News.vue";
import router from "@/router";

const theme = useTheme()

const isDark = computed(() => theme.global.name.value === "dark")

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function onClickNews(id: string) {
  void router.push(`/news/${id}`);
}

</script>

<style scoped>
.fab {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}
</style>
