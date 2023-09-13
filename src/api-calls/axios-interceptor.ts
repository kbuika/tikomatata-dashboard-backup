import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios"
import { removeCookie } from "../lib/utils"

// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  // Add other default configurations here if needed
})

// Function to handle the logout logic
function logoutUser(): void {
  // Implement your logout logic here (e.g., clearing tokens, redirecting to login page, etc.)
  removeCookie("accessToken")
  window.location.href = "/"
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //TODO: Modify the request config here if needed (e.g., adding headers, tokens, etc.)
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response
  },
  (error: AxiosError) => {
    //TODO: Consider better token expiry handling -- refreshing the token and retrying the request
    //TODO: Or consider using both techniques.
    if (error.response?.status === 401) {
      // If the response status is 401, the user is unauthorized
      logoutUser()
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
