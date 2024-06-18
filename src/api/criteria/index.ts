import api from "..";

export const getListCriteria = (params: any) =>
  api.get("/criteria", { params: params });

export const postCriteria = (payload: any) => api.post("/criteria", payload);

export const deleteCriteria = (id: string) => api.delete(`/criteria/${id}`);

export const deleteAllCriteria = () => api.post("/criteria/reset");
