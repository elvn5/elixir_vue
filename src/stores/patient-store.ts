import { supabaseApp } from "@/services";
import {  useApi } from "@/utils";
import type { Staff } from "@/types";
import type { PatientMedia, Patients, PatientStore, PatientStoreState, UploadPatientFile } from "@/types/patients";
import type { Patient } from "@/features/edit-patient/schema";
import { useProfile } from "@/stores/profile-store";

type AttachDoctor = {
  doctorId: string;
  patientId: string;
}

export const usePatientsMedia = useApi<PatientMedia[], string>(
  "patient-media",
  async (id) => {
      const { data, error } = await supabaseApp.
      from("patient_files")
        .select("*")
        .eq("patient_id", id)

      return {
        data, error
      }
})

export const useUploadPatientsFile = useApi<unknown, UploadPatientFile>
("upload-file",
  async (arg) => {
  const formData = arg?.data as FormData;
  const file = formData?.get("file") as File | null;

    if (!file) {
      throw new Error("Файл не найден в FormData");
    }
    const filename = file.name;
    const storagePath = `${arg?.patientId}/${filename}`;

    const { data, error } = await supabaseApp.storage
      .from("uploads")
      .upload(storagePath, file);

    console.log(data);

    const { data: urlData } = supabaseApp
      .storage
      .from('uploads')
      .getPublicUrl(data?.path as string);

    const publicUrl = urlData.publicUrl;

    console.log(data)

    await supabaseApp.from("patient_files").insert({
      patient_id: arg?.patientId,
      file_url: publicUrl,
    }).eq("id", data?.id)


    return { data, error };
})

export const useCreatePatient = useApi<PatientStore, Patient>(
  "create-patient",
  async (arg) => {

    const profile = useProfile();

  const patients = usePatients()
  const { data, error } = await supabaseApp.from("patients")
    .insert([{ ...arg, clinic_id: profile?.data?.clinic_id }])
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
