import { useApi } from "@/utils";
import { supabaseApp } from "@/services";

export const useProfile = useApi("profile", async()=> {
  const { data, error } = await supabaseApp.auth.getUser();
  const { data: clinicData, error: profileError } = await supabaseApp
    .from('user_profiles')
    .select('clinic_id')
    .eq('user_id', data.user?.id)
    .single();

  if(profileError) {
    console.error(profileError)
  }

  const dataWithClinicId = { ...data, clinic_id: clinicData?.clinic_id }

  return {
  data: dataWithClinicId, error
  }
})
