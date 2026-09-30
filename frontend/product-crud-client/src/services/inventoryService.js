import api from "./apiClient.js";

export const getSuppliers = () => api.get("/suppliers");
export const createSupplier = (payload) => api.post("/suppliers", payload);
export const updateSupplier = (id, payload) =>
  api.put(`/suppliers/${id}`, payload);
export const deleteSupplier = (id) => api.delete(`/suppliers/${id}`);

export const getStockMovements = () => api.get("/stockmovements");
export const createStockMovement = (payload) =>
  api.post("/stockmovements", payload);

export default api;
