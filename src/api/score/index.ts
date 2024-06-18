import api from "..";

export const postScores = (payload: any) => api.post("/scores", payload);

export const getListEmployeeScores = (params: any) =>
  api.get("/scores/employee-list-score", { params: params });

export const getDetailScore = (id: string) => api.get(`/scores/employee/${id}`);

export const updateEmployeeScore = (id: string, payload: any) =>
  api.put(`/scores/employee/${id}`, payload);

export const deleteScore = (id: string) => api.delete(`/scores/${id}`);

export const deleteAllScore = () => api.post("/scores/reset");