import { defineStore } from "pinia";
import { supabaseApp } from "@/services";

export type PatientHistory = {
  "id": string,
  "patient_id": string,
  "doctor_id": string,
  "appointment_id": string,
  "notes": string,
  "visit_date": string,
  staff: {
    "id":string,
    "role":string,
    "email":string,
    "phone":string,
    "active": boolean,
    "clinic_id": string,
    "full_name": string,
  }
}


export const usePatientHistory = defineStore("patient-history", ()=> {
  const data = ref<PatientHistory[] | undefined>()

  async function fetchHistory(){
    try {
      const response = await supabaseApp.from("visits")
        .select(`*, staff:doctor_id (*)`)
        .eq("patient_id", "0f2551ad-0e92-4785-8730-2a6d2d0219cd")
        .eq("doctor_id", "34fbe97f-6000-4f8f-8cb7-f5318932e26d")
      if(response.data) {
        data.value = [...response.data]
        console.log(data.value)

      }

    }catch(e){
      console.error(e)
    }
  }
  return {
  data, fetchHistory,
  }
})
