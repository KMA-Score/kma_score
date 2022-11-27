import { AxiosResponse } from "axios";
import { api } from "../utils/axios";

class SubjectService {
  get(subjectId: string): Promise<AxiosResponse> {
    return api.get(`/subject/${subjectId}`);
  }

  getAll(): Promise<AxiosResponse> {
    return api.get("/subjects");
  }
}

export default new SubjectService();
