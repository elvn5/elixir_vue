import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { PostgrestError } from "@supabase/supabase-js";

type SupabaseResponse<T> = {
  data: T | null;
  error: Error | null;
};

type ApiCallback<T, S> = (arg?: S) => Promise<SupabaseResponse<T>>;

export function useApi<T, S = never>(storeId: string, apiCallback: ApiCallback<T, S>) {
  return defineStore(storeId, () => {
    const data = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<Error | PostgrestError | null>(null);

    async function fetch(args?: S) {
      loading.value = true;
      error.value = null;

      try {
        const response = await apiCallback(args);

        if (response.error) {
          error.value = new Error("Произошла ошибка при запросе");
          data.value = null;
        } else {
          data.value = response.data;
        }
      } catch (err) {
        error.value = err as Error;
        data.value = null;
      } finally {
        loading.value = false;
      }
    }

    function reset() {
      data.value = null;
      loading.value = false;
      error.value = null;
    }

    return {
      data,
      loading,
      error,
      fetch,
      reset,
    };
  });
}
