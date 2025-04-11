import { api, type SignUpData } from "@/services";
import router from "@/router";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { useMessagesStore } from "@/stores/";

export const useSignUpStore = defineStore("signup-store", ()=> {

  async function signUp(data: SignUpData) {
    const { add } = useMessagesStore();

    const { email, password, username } = data;
    try {
      const success = await api.signUp({
        email,
        password,
        username,
      });

      if(success) {
        await router.push({ path: "/auth" });
        add("Регистрация завершена, войдите в систему")
      }

    }catch (error: unknown) {
      if(error instanceof AxiosError){
        add(error?.response?.data.message as string);
      }
    }
  }

  return {
    signUp,
  }
})
