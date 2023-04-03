import { api } from "../utils/axios";
import { AxiosResponse } from "axios";

class StudentService {
  getAll(): Promise<AxiosResponse> {
    return api.get("/students").then((res) => res.data);
  }
  getScores(studentId: string): Promise<AxiosResponse> {
    return api.get(`/student/${studentId}`).then((res) => res.data);
  }
}

export default new StudentService();
