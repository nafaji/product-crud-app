import axios from "axios";

// Update this if your API runs on a different port (check Properties/launchSettings.json
// in the backend project, or the console output when you run `dotnet run`).
const API_BASE_URL = "https://127.0.0.1:7080/api/products";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => api.get("/");
export const getProduct = (id) => api.get(`/${id}`);
export const createProduct = (payload) => api.post("/", payload);
export const updateProduct = (id, payload) => api.put(`/${id}`, payload);
export const deleteProduct = (id) => api.delete(`/${id}`);

export default api;
