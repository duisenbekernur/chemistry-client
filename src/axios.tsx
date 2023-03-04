import axios from "axios";

const instanse = axios.create({
  baseURL: "https://chemistry-serve.onrender.com/api/",
  // baseURL: "http://localhost:8000/api/",
});

instanse.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${window.localStorage.getItem(
    "token"
  )}`;
  return config;
});

export default instanse;
