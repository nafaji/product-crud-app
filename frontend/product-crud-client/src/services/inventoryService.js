import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getSuppliers = () => api.get("/suppliers");
export const createSupplier = (payload) => api.post("/suppliers", payload);
export const updateSupplier = (id, payload) =>
  api.put(`/suppliers/${id}`, payload);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}`);

export const getStockMovements = () => api.get("/stockmovements");
export const createStockMovement = (payload) =>
  api.post("/stockmovements", payload);

export default api;
