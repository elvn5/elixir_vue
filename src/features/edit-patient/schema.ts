import { z } from "zod";
import { stringRequired } from "@/utils"

export const EditPatientSchema = z.object({
  full_name: stringRequired,
  gender: stringRequired,
  birth_date: stringRequired,
  phone: stringRequired,
  email: stringRequired.email({ message: "Введите валидный email" }),
  address: stringRequired,
  document_id: stringRequired,
})
