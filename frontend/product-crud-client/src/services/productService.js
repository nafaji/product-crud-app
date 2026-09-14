import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) =>
  api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export const getCategories = () => api.get("/categories");
export const getCategory = (id) => api.get(`/categories/${id}`);
export const createCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) =>
  api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export const getUnits = () => api.get("/units");
export const getUnit = (id) => api.get(`/units/${id}`);
export const createUnit = (payload) => api.post("/units", payload);
export const updateUnit = (id, payload) => api.put(`/units/${id}`, payload);
export const deleteUnit = (id) => api.delete(`/units/${id}`);

export default api;
