import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getCategories = () => api.get("/categories");
export const getCategory = (id) => api.get(`/categories/${id}`);
export const createCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) =>
  api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export default api;
