import { API_BASE_URL } from "../../config/app.config.json";
import axios from "axios";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});
