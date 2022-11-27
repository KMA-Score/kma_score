import { AxiosResponse } from "axios";
import { api } from "../utils/axios";

class CommonService {
  search(search: string): Promise<AxiosResponse> {
    return api.get(`/search?query=${search}`);
  }

  getStatistics(): Promise<AxiosResponse> {
    return api.get("/statistics");
  }
}

export default new CommonService();
