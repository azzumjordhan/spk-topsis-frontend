import api from "..";

export const getResultTopsis = () => api.get("/topsis/rank");