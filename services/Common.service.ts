import { AxiosResponse } from "axios";
import { api } from "../utils/axios";

class CommonService {
  search(search: string): Promise<AxiosResponse> {
    return api.get(`/search?query=${search}`).then((res) => res.data);
  }

  getStatistics(): Promise<AxiosResponse> {
    return api.get("/statistics").then((res) => res.data);
  }
}

export default new CommonService();
