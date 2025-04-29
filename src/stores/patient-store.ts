import { supabaseApp } from "@/services";
import { useApi } from "@/utils";
import type { Staff } from "@/types";
import type { Patients, PatientStore, PatientStoreState } from "@/types/patients";

type AttachDoctor = {
  doctorId: string;
  patientId: string;
}

export const useCreatePatient = useApi<PatientStore, PatientStore>(
  "create-patient",
  async (arg) => {

  const patients = usePatients()
  const { data, error } = await supabaseApp.from("patients")
    .insert([arg])
    .select()
    .single()

  if(data) {
    void patients.fetch()
  }

  return { data, error }
})

export const useDetachDoctor = useApi<PatientStoreState, string>(
  "detach-doctor",
  async (id) => {
  const patientInfo = usePatientInfo()
  const { data, error } = await supabaseApp.from("patients")
    .update({ attached_doctor_id: null })
    .eq("id",id )
    .select()
    .single()

    if(data) {
      void patientInfo.fetch(id)
    }

  return { data, error }
})

export const useEditPatient = useApi<PatientStoreState, PatientStoreState>(
  "edit-patient",
  async (arg) => {
  const { data, error } = await supabaseApp.from("patients")
    .update({
      full_name: arg?.full_name,
      gender: arg?.gender,
      birth_date: arg?.birth_date,
      phone: arg?.phone,
      email: arg?.email,
      address: arg?.address,
      document_id: arg?.document_id,
    })
    .eq("id", arg?.id)
    .select()
    .single()

  return {
    data, error
  }
})

export const useAttachDoctor = useApi<PatientStoreState, AttachDoctor>(
  "attach-doctor",
  async (arg) => {
  const { data, error } = await supabaseApp.from("patients")
    .update({ attached_doctor_id: arg?.doctorId })
    .eq("id", arg?.patientId)
    .select()
    .single()

  return { data, error }
})

export const useAvailableDoctors = useApi<Staff[]>("available-doctors", async () => {
  const { data, error } = await supabaseApp.from("staff")
    .select("*")
    .eq("role", "doctor")
  return { data, error }
})

export const usePatients = useApi<Patients[]>("patients", async () => {
  const { data, error } = await supabaseApp.from("patients")
    .select()

  return { data, error }
})

export const usePatientInfo = useApi<PatientStoreState, string>("patient-info",async (id) => {
  const { data, error } = await supabaseApp.from("patients")
    .select(`*,
      attached_doctor:staff (
      id,
      full_name,
      role,
      email,
      phone
    )
  `)
    .eq("id", id)
    .single()

  return {
    data, error
  }
})

export const usePatientHistory = useApi<PatientStore[],string>(
  "patient-history",
  async () => {
  const { data, error } = await supabaseApp.from("visits")
    .select(`*, staff:doctor_id (*)`)
    .eq("patient_id", "0f2551ad-0e92-4785-8730-2a6d2d0219cd")

  return {
    data, error
  }
})
