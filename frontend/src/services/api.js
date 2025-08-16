import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
  withCredentials: false
});

// Si tu as un token auth stocké
api.interceptors.request.use(cfg=>{
  const token = localStorage.getItem("token");
  if(token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;
