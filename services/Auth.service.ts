import { AxiosResponse } from "axios";
import { api } from "../utils/axios";

class AuthService {
  public static async userLoginReq(token: string): Promise<AxiosResponse> {
    return api.post(`/auth/userLoginReq`, {
      token,
    });
  }
}

export default AuthService;
