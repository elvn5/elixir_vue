import { EPaymentStatus } from "@/types/patients";

export const formatEnum = (arg: EPaymentStatus | undefined) => {
  switch (arg){
    case EPaymentStatus.PAID:
      return "Оплачено";
    case EPaymentStatus.UNPAID:
      return "Неоплачено"
    default:
      return "Неоплачено"
  }
}
