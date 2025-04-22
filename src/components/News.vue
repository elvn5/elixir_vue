<template>
  <v-card class="ma-2">
    <v-row class="align-center pa-6">
      <v-icon :icon="icon" />
      <v-card-title>{{ title }}</v-card-title>
    </v-row>
    <v-img
      :src="img"
    />
    <v-card-text>
      {{ desc }}
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="onClickDetails">
        Подробнее
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">

type NewsProps = {
  title: string;
  img?: string;
  desc: string;
  icon: string;
  onClickDetails: (id:string) => void;
}


defineProps<NewsProps>()
</script>

<style scoped>

</style>
