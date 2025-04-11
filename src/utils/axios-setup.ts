import axios from 'axios';
import { parseLocalStorage } from "@/utils/parse-local-storage";

type AuthState = {
  accessToken: string;
  isAuthenticated: boolean;
}

const elixirApi = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: {
    "Authorization": `Bearer ${parseLocalStorage<AuthState>("auth").accessToken}`,
  }
})

export {
  elixirApi
}
