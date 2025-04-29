<template>
  <v-app>
    <v-snackbar-queue v-model="messages.queue" />
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useAuthStore, useMessagesStore, useProfile } from "@/stores";
const auth = useAuthStore();
const profile = useProfile()

onMounted(()=> {
  if(auth.isAuthenticated){
    profile.fetch()
  }
})
const messages = useMessagesStore();
</script>
