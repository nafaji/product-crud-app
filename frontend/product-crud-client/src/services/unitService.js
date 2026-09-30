import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getUnits = () => api.get("/units");
export const getUnit = (id) => api.get(`/units/${id}`);
export const createUnit = (payload) => api.post("/units", payload);
export const updateUnit = (id, payload) => api.put(`/units/${id}`, payload);
export const deleteUnit = (id) => api.delete(`/units/${id}`);

export default api;
