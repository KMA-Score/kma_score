import { AxiosResponse } from "axios";

export type AxiosFetcher = (params: string) => Promise<AxiosResponse<any>>;
