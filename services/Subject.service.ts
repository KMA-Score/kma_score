import { AxiosResponse } from "axios";
import { api } from "../utils/axios";

class SubjectService {
  get(subjectId: string): Promise<AxiosResponse> {
    return api.get(`/subject/${subjectId}`).then((res) => res.data);
  }

  getAll(): Promise<AxiosResponse> {
    return api.get("/subjects").then((res) => res.data);
  }
}

export default new SubjectService();
