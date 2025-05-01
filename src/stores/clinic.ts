import { defineStore } from "pinia";
import { supabaseApp } from "@/services";

export type ClinicData = {
  clinic: {
    address:string,
    created_at: string,
    email: string,
    id: string,
    name: string,
    phone: string
  }
}

export const useClinicStore = defineStore("clinic", ()=> {
  const clinicData = ref<ClinicData["clinic"] | undefined>();

  async function getClinic() {
    const {
      data: { user }
    } = await supabaseApp.auth.getUser();

    if(user) {
      const { data } = await supabaseApp
        .from('user_profiles')
        .select('clinic:clinic_id(*)')
        .eq('user_id', user.id)
        .single<ClinicData>();

      clinicData.value = data?.clinic
    }


  }

  return { clinicData, getClinic };
})
