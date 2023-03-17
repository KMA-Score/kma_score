import { api } from "../utils/axios";
import { AxiosResponse } from "axios";

class StudentService {
  getAll(): Promise<AxiosResponse> {
    return api.get("/students");
  }
  getScores(studentId: string): Promise<AxiosResponse> {
    return api.get(`/student/${studentId}`);
  }
}

export default new StudentService();
