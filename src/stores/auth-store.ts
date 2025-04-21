import { defineStore } from "pinia";
import { type SignInData, supabaseApp } from "@/services";
import { useMessagesStore } from "@/stores/messages-store";
import router from "@/router";
import type { AuthTokenResponsePassword } from "@supabase/supabase-js";

export const useAuthStore = defineStore("auth",
  () => {
  const { add } = useMessagesStore();

  const isAuthenticated = ref(false);
  const accessToken = ref<string | null>(null);
  const profileName = ref<string | undefined>();

  function logout() {
    isAuthenticated.value = false;
    accessToken.value = null;
    void router.push("/auth");
  }

  async function login(data: SignInData) {
    try {

      const response: AuthTokenResponsePassword = await supabaseApp.auth.signInWithPassword({
        password: data.password,
        email: data.email
      })

      if(response.error) {
        add(response.error.message)
      }

      if(response.data.user) {
        profileName.value = response.data.user?.email;
        isAuthenticated.value = true;
        void router.push("/");
      }


    }catch (e) {
        console.debug(e);
    }
  }

  return {
    login,
    isAuthenticated,
    logout,
    accessToken,
    profileName
  }

}, {
  persist: {
    pick: ["isAuthenticated", "accessToken", "profileName"],
    storage: localStorage
  }
  })
