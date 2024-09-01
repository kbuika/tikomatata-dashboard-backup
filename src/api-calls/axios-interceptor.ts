import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios"
import { removeAllCookies } from "../lib/utils"

// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  // Add other default configurations here if needed
})

// Function to handle the logout logic
function logoutUser(): void {
  // Store the current page URL before logging out
  sessionStorage.setItem("lastVisitedPage", window.location.pathname)
  
  // Clear all cookies
  removeAllCookies()
  
  // Redirect to login page
  window.location.href = "/"
}

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any request modifications here if needed
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      logoutUser()
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
