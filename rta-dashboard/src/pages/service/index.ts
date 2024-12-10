import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

// Define the API client
const apiClient: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000", // Replace with your API's base URL
    timeout: 5000, // Optional: Set a timeout
    headers: {
        "Content-Type": "application/json",
    },
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // Add auth token if available
        const token = localStorage.getItem("token"); // Replace with your token logic
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        // Handle errors globally, if needed
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export default apiClient;