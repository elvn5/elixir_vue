<template>
  <v-snackbar-queue v-model="messages.queue" />
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
import { useMessagesStore } from "@/stores";

const messages = useMessagesStore();
</script>
