import { z } from "zod";
import { stringOptional, stringRequired } from "@/utils"

export const PatientSchema = z.object({
  full_name: stringRequired,
  gender: stringRequired,
  birth_date: stringRequired,
  phone: stringRequired,
  email: stringRequired.email({ message: "Введите валидный email" }),
  address: stringRequired,
  document_id: stringRequired,
  allergies: stringOptional,
  contraindications: stringOptional,
  implants: stringOptional
})

export type Patient = z.infer<typeof PatientSchema>;
