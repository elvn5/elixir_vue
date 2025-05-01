import * as z from "zod"

const stringRequired = z.string({ message: "Обязательное поле" })
const stringOptional = z.string({ message: "Введите строковое значение" }).optional()

const passwordSchema = z.object({
  password: stringRequired.min(8, "Минимуму 8 символов"),
  confirmPassword: stringRequired,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // This shows the error on confirmPassword field
  });

const signInSchema = z.object({
    email: stringRequired.email(),
    password: stringRequired.min(8, "Минимуму 8 символов")
  }
)

const signUpSchema = z.object({
  email: stringRequired.email("Введите валидный e-mail"),
}).and(passwordSchema)

type SignInForm = z.infer<typeof signInSchema>
type SignUpForm = z.infer<typeof signUpSchema>

export type {
  SignInForm,
  SignUpForm,
}

export {
  signInSchema,
  passwordSchema,
  signUpSchema,
  stringRequired,
  stringOptional
}
