import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log("🔍 Environment BASE_URL:", BASE_URL); 

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

// Request interceptor - adds token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // ✅ ADD DEBUGGING
    console.log("📤 Request:", config.method.toUpperCase(), config.baseURL + config.url);
    console.log("📤 Has Token:", !!token);
    
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor - handles 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken");
      
      // Don't redirect if already on login/signup
      if (!window.location.pathname.includes("/login") && 
          !window.location.pathname.includes("/signup")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;