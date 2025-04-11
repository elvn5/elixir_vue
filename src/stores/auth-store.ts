import { defineStore } from "pinia";
import { api, type SignInData } from "@/services";
import { AxiosError } from "axios";
import { useMessagesStore } from "@/stores/messages-store";
import router from "@/router";

export const useAuthStore = defineStore("auth",
  () => {
  const { add } = useMessagesStore();

  const isAuthenticated = ref(false);
  const accessToken = ref<string | null>(null);

  function logout() {
    isAuthenticated.value = false;
    accessToken.value = null;
    void router.push("/auth");
  }

  async function login(data: SignInData) {
    try {
      const token = await api.login(data);
      if(token) {
        accessToken.value = token;
        isAuthenticated.value = true;
        void router.push("/");
      }


    }catch (e: unknown) {
      if(e instanceof AxiosError) {
          add(e?.response?.data.message);
      }
    }
  }

  return {
    login,
    isAuthenticated,
    logout,
    accessToken
  }

}, {
  persist: {
    pick: ["isAuthenticated", "accessToken"],
    storage: localStorage
  }
  })
