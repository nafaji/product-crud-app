import api from "./apiClient.js";

export const getUnits = () => api.get("/units");
export const getUnit = (id) => api.get(`/units/${id}`);
export const createUnit = (payload) => api.post("/units", payload);
export const updateUnit = (id, payload) => api.put(`/units/${id}`, payload);
export const deleteUnit = (id) => api.delete(`/units/${id}`);

export default api;
