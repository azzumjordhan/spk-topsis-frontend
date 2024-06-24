import { localStorageMixins } from "@/mixins/localStorage.mixin";
import axios from "axios";
import Router from "next/router";

const api = axios.create({
  baseURL: "/api",
  headers: {
    Accept: "*/*",
  },
});

api.interceptors.request.use;

api.interceptors.request.use(
  async (config: any) => {
    const token = JSON.parse(localStorage.getItem("access_token") as string);
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      localStorageMixins.remove("access_token");
      localStorageMixins.remove("profile");
      localStorage.clear();
      Router.push("/authentication/login");
    }
    return Promise.reject(error);
  }
);

export default api;
