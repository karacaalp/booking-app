import { API_URL } from "@/constants/endpoints";
import axios from "axios";

// API yapılandırma sabitleri
export const API_TIMEOUT = 15000;

// Özel hata sınıfları
export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "ApiError";
  }
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(
      new ApiError(`Request configuration error: ${error.message}`)
    );
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    if (!response.data.success) {
      throw new ApiError("Server response unsuccessful", response.status);
    }
    return response;
  },
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new ApiError(`Request timeout after ${API_TIMEOUT}ms`);
      }

      if (error.response) {
        const statusCode = error.response.status;
        const message = error.response.data?.message || error.message;

        switch (statusCode) {
          case 400:
            throw new ApiError(`Invalid request: ${message}`, statusCode);
          case 401:
            throw new ApiError("Unauthorized access", statusCode);
          case 403:
            throw new ApiError("Permission denied", statusCode);
          case 404:
            throw new ApiError("Resource not found", statusCode);
          case 409:
            throw new ApiError("Conflict with current state", statusCode);
          case 500:
            throw new ApiError("Internal server error", statusCode);
          default:
            throw new ApiError(`Operation failed: ${message}`, statusCode);
        }
      }

      if (error.request) {
        throw new ApiError("No response received from server");
      }
    }

    throw new ApiError("Unexpected error occurred");
  }
);

export default axiosInstance;
