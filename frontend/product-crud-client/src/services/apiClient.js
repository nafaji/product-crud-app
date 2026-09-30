import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const auth = (() => {
    try {
      const stored = localStorage.getItem("producthub_auth");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  if (auth?.token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${auth.token}`,
    };
  }

  return config;
});

export default apiClient;
