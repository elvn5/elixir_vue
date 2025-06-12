type SignUpData = {
  email: string;
  password: string;
}

type SignInData = {
  email: string;
  password: string;
}

type SignInResponse = {
  accessToken: string;
}

export type {
  SignUpData,
  SignInData,
  SignInResponse
}
