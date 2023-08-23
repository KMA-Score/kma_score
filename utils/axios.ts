import axios from "axios";
import { getTimestamp } from "./time";
import { encryptWithAesCbc } from "./aes";

const axiosBaseAPIInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

axiosBaseAPIInstance.interceptors.request.use(
  (config) => {
    if (!process.env.KMA_API_KEY || !process.env.KMA_API_SECRET) {
      return config;
    }

    config.headers["X-KMA-API-KEY"] = process.env.KMA_API_KEY;

    const key = Buffer.from(process.env.KMA_API_SECRET, "base64");

    const timestamp = String(getTimestamp());
    config.headers["X-KMA-API-SECRET-HASH"] = encryptWithAesCbc(timestamp, key);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const axiosNextAPIInstance = axios.create({
  timeout: 5000,
});

export const api = axiosBaseAPIInstance;
export const apiNext = axiosNextAPIInstance;
