<template>
  <v-container>
    <v-list>
      <v-list-item @click="()=>goToDetails()">
        Patient 1
      </v-list-item>
      <v-list-item @click="()=>goToDetails()">
        Patient 2
      </v-list-item>
      <v-list-item @click="()=>goToDetails()">
        Patient 3
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup lang="ts">
import router from "@/router";

function goToDetails(id = 1){
  console.log(id)
  router.push(`/patients/${id}?tab=history`);
}

</script>

<style scoped>
strong {
  display: inline-block;
  min-width: 100px;
}

li {
  margin: 1rem;
}
</style>
