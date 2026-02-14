import axios from "axios";

const api = axios.create({
  baseURL: "https://banking-backend-cvma.onrender.com/api",
  withCredentials: true
});

export default api;
