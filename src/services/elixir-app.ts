import { type AxiosInstance, HttpStatusCode } from "axios";
import { elixirApi } from "@/utils";
import type { SignUpData, SignInData, SignInResponse } from "@/services/types";

class ElixirApi {
  axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async signUp(data: SignUpData) {
    try{
        const response = await this.axios.post("auth/signup", data);
        return response.status === HttpStatusCode.Created
    } catch (e) {
      throw e;
    }
  }

  async login(data: SignInData) {
    try{
      const response = await this.axios.post<SignInResponse>("auth/signin", data);

      if (response.status === HttpStatusCode.Created) {
        return response.data.accessToken
      }
    } catch (e) {
      throw e;
    }
  }
}

export const api = new ElixirApi(elixirApi)
