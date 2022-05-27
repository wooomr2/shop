import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: process.env.API,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.defaults.headers.Authorization = token ? `Bearer ${token}` : "";

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    console.log(error.response);

    const status = error.response ? error.response.status : 401;

    if (status && status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
