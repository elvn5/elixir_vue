import * as z from "zod"

const string = z.string({ message: "Обязательное поле" })

const username = string
  .min(4, "Минимум 4 символа")
  .max(20, "Максимум 20 символов")
  .regex(/^[A-Za-z]+$/, {
  message: 'Разрешено использовать только латинские символы',
});

const passwordSchema = z.object({
  password: string.min(8, "Минимуму 8 символов"),
  confirmPassword: string,
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"], // This shows the error on confirmPassword field
  });

const signInSchema = z.object({
    username: username,
    password: string.min(8, "Минимуму 8 символов")
  }
)

const signUpSchema = z.object({
  email: string.email("Введите валидный e-mail"),
  username: username,
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
  signUpSchema
}
