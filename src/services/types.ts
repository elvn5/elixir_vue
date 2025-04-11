type SignUpData = {
  email: string;
  password: string;
  username: string;
}

type SignInData = {
  username: string;
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
