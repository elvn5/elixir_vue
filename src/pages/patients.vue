<template>
  <v-container>
    <p class="text-h2 pb-2">
      Пациенты
    </p>
    <div class="patients-wrapper">
      <patients-profile />
      <patients-profile />
      <patients-profile />
      <patients-profile />
    </div>
  </v-container>
</template>
<script setup lang="ts">
</script>

<style scoped>
.patients-wrapper {
display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
