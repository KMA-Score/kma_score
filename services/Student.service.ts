import { api } from "../utils/axios";
import { AxiosResponse } from "axios";

class StudentService {
  get(studentId: string): Promise<AxiosResponse> {
    return api.get(`/student/${studentId}`);
  }
}

export default new StudentService();
