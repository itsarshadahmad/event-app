import axios from "axios";

const api = axios.create({
  // baseURL: import.meta.env.VITE_API_URL,
//   baseURL: "/api/v1",
  headers: {},
});

export default api;
