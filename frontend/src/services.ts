import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000,
  headers: {
    Accept: "application/json",
  },
});

export const fetcher = (
  url: string,
  config?: AxiosRequestConfig<any> | undefined
) => api.get(url, config).then((res) => res.data);

export { api };
