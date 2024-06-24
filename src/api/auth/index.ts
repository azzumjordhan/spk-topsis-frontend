import api from "..";

export const login = (payload: any) => api.post("/auth/login", { ...payload });
