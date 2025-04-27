import { supabaseApp } from "@/services";
import { useApi } from "@/utils";

export type PatientStore = {
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

export type PatientStoreState = {
  address: string,
  allergies: string,
  attached_doctor_id: string | null,
  birth_date: string,
  clinic_id: string,
  contraindications: string,
  created_at: string,
  document_id: string,
  email: string,
  full_name: string,
  gender: string,
  id: string,
  implants: string,
  payment_status: string,
  phone: string,
  photo_url: string | null
}

export const usePatientInfo = useApi<PatientStoreState>("patient-info",async () => {
  const { data, error } = await supabaseApp.from("patients")
    .select("*")
    .eq("id", "0f2551ad-0e92-4785-8730-2a6d2d0219cd")
    .single()

  console.log(data, error);

  return {
    data, error
  }
})


export const usePatientHistory = useApi<PatientStore[]>(
  "patient-history",
  async () => {
  const { data, error } = await supabaseApp.from("visits")
    .select(`*, staff:doctor_id (*)`)
    .eq("patient_id", "0f2551ad-0e92-4785-8730-2a6d2d0219cd")
    .eq("doctor_id", "34fbe97f-6000-4f8f-8cb7-f5318932e26d")

  return {
    data, error
  }
})
