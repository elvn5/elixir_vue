
export type PatientStore = Partial<{
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
}>

export enum EPaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
}

export type PatientStoreState = Partial<{
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
  payment_status: EPaymentStatus,
  phone: string,
  photo_url: string | null,
  attached_doctor: {
    "id":string,
    "role":string,
    "email":string,
    "phone":string,
    "full_name":string,
  }
}>

export type UploadPatientFile = {
  data: FormData,
  patientId: string
}

export type PatientMedia = {
  id: string;
  patient_id: string;
  file_url: string;
  uploaded_at: string;
}

export type Patients = {
  id: string;
  full_name:string;
}


export type UploadFile = {
  file: File;
  patient_id: string;
}

