import api from "./apiClient.js";

export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (payload) => api.post("/products", payload);
export const updateProduct = (id, payload) =>
  api.put(`/products/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

export default api;
