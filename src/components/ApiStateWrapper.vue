<template>
  <div class="w-100">
    <div
      v-if="loading"
      class="d-flex justify-center align-center py-6"
    >
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
    </div>

    <div
      v-else-if="error"
      class="d-flex justify-center align-center py-6"
    >
      <v-alert
        type="error"
        variant="elevated"
        border="start"
        color="error"
        class="w-100"
      >
        {{ error.message }}
      </v-alert>
    </div>

    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  loading: boolean;
  error: Error | null;
}

const props = defineProps<Props>();

// можно использовать computed, если надо что-то дополнительно обработать
const loading = computed(() => props.loading);
const error = computed(() => props.error);
</script>
