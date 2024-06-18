import api from "..";

export const getListKaryawan = (params: any) =>
  api.get("/employees", { params: params });

export const postKaryawan = (payload: any) => api.post("/employees", payload);

export const deleteKaryawan = (id: string) => api.delete(`/employees/${id}`);

export const deleteAllKaryawan = () => api.post("/employees/reset");
