import api from "..";

export const getListUser = (params: any) =>
  api.get("/user", { params: params });

export const getDetailUser = (id: string) => api.get(`/user/${id}`);

export const updateUser = (id: string, payload: any) =>
  api.put(`/user/${id}`, payload);

export const updateStatus = (id: string, payload: any) =>
  api.put(`/user/status/${id}`, payload);

export const addUser = (payload: any) => api.post("/auth/register", payload);
