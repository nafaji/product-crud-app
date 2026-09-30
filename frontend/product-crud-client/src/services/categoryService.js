import api from "./apiClient.js";

export const getCategories = () => api.get("/categories");
export const getCategory = (id) => api.get(`/categories/${id}`);
export const createCategory = (payload) => api.post("/categories", payload);
export const updateCategory = (id, payload) =>
  api.put(`/categories/${id}`, payload);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

export default api;
