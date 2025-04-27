import { defineStore } from 'pinia';
import { ref } from 'vue';

type SupabaseResponse<T> = {
  data: T | null;
  error: Error | null;
};

type ApiCallback<T> = () => Promise<SupabaseResponse<T>>;

export function useApi<T>(storeId: string, apiCallback: ApiCallback<T>) {
  return defineStore(storeId, () => {
    const data = ref<T | null>(null);
    const loading = ref(false);
    const error = ref<Error | null>(null);

    async function fetchData() {
      loading.value = true;
      error.value = null;

      try {
        const response = await apiCallback();

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
      fetchData,
      reset,
    };
  });
}
