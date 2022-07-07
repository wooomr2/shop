import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const prevRequest = error?.config;

    if (error?.response?.status === 403 && !prevRequest?.sent) {
      prevRequest.sent = true;

      const res = await axiosInstance.get("/refresh");

      const newAccessToken = res.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);

      prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

      return axiosInstance(prevRequest);
    }

    if (error?.response?.status === 401) {
      localStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
