import { AxiosResponse } from "axios";
import { api } from "../utils/axios";

class AuthService {
  public static async verifyToken(accessToken: string): Promise<AxiosResponse> {
    return api.post(`/auth/verifyToken`, {
      accessToken,
    });
  }
}

export default AuthService;
