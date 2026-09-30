import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api";

const authApi = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getStoredAuth = () => {
  try {
    const stored = localStorage.getItem("producthub_auth");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const setStoredAuth = (auth) => {
  localStorage.setItem("producthub_auth", JSON.stringify(auth));
  return auth;
};

export const clearStoredAuth = () => {
  localStorage.removeItem("producthub_auth");
};

export const getAuthToken = () => getStoredAuth()?.token ?? null;

export const login = async (credentials) => {
  const { data } = await authApi.post("/auth/login", credentials);
  return setStoredAuth(data);
};

export const register = async (credentials) => {
  const { data } = await authApi.post("/auth/register", credentials);
  return setStoredAuth(data);
};

export const logout = () => {
  clearStoredAuth();
};

export default authApi;
