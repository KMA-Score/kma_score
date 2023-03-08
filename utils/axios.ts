import axios from "axios";
import { getTimestamp } from "./time";
import { encryptWithAesCbc } from "./aes";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      !process.env.NEXT_PUBLIC_KMA_API_KEY ||
      !process.env.NEXT_PUBLIC_KMA_API_SECRET
    ) {
      return config;
    }

    config.headers["X-KMA-API-KEY"] = process.env.NEXT_PUBLIC_KMA_API_KEY;

    const key = Buffer.from(process.env.NEXT_PUBLIC_KMA_API_SECRET, "base64");

    const timestamp = String(getTimestamp());
    config.headers["X-KMA-API-SECRET-HASH"] = encryptWithAesCbc(timestamp, key);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = axiosInstance;
