import axios from "axios";

const axiosInstance = axios.create({
baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000", // Replace with your API base URL
  timeout: 10000, // Set timeout to 10 seconds
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Set Content-Type to JSON only if data is not FormData
    if (config.data && !(config.data instanceof FormData)) {
      config.headers = config.headers || {};
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
