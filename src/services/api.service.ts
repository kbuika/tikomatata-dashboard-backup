import Cookies from "js-cookie";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios"
import { removeCookie } from "../lib/utils"


// Function to handle the logout logic
function logoutUser(): void {
  // Implement your logout logic here (e.g., clearing tokens, redirecting to login page, etc.)
  removeCookie("accessToken")
  window.location.href = "/"
}

// Request interceptor
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    //TODO: Modify the request config here if needed (e.g., adding headers, tokens, etc.)
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  },
)

// Response interceptor
axios.interceptors.response.use(
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


abstract class APIService {
    protected baseURL: string;
    protected headers: any = {};
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    setAccessToken(token: string) {
      Cookies.set("accessToken", token);
    }
  
    getAccessToken() {
      return Cookies.get("accessToken");
    }
  
    purgeAccessToken() {
      Cookies.remove("accessToken", { path: "/" });
    }
  
    getHeaders() {
      return {
        Authorization: `Bearer ${this.getAccessToken()}`,
      };
    }
  
    getWithoutBase(url: string, config = {}): Promise<any> {
      return axios({
        method: "get",
        url: url,
        headers: this.getAccessToken() ? this.getHeaders() : {},
        ...config,
      });
    }
  
    get(url: string, config = {}): Promise<any> {
      return axios({
        method: "get",
        url: this.baseURL + url,
        headers: this.getAccessToken() ? this.getHeaders() : {},
        ...config,
      });
    }
  
    post(url: string, data = {}, config = {}): Promise<any> {
      return axios({
        method: "post",
        url: this.baseURL + url,
        data,
        headers: this.getAccessToken() ? this.getHeaders() : {},
        ...config,
      });
    }
  
    put(url: string, data = {}, config = {}): Promise<any> {
      return axios({
        method: "put",
        url: this.baseURL + url,
        data,
        headers: this.getAccessToken() ? this.getHeaders() : {},
        ...config,
      });
    }
  
    patch(url: string, data = {}, config = {}): Promise<any> {
      return axios({
        method: "patch",
        url: this.baseURL + url,
        data,
        headers: this.getAccessToken() ? this.getHeaders() : {},
        ...config,
      });
    }
  
    delete(url: string, data?: any, config = {}): Promise<any> {
      return axios({
        method: "delete",
        url: this.baseURL + url,
        data: data,
        headers: this.getAccessToken() ? this.getHeaders() : {},
        ...config,
      });
    }
  
    mediaUpload(url: string, data = {}, config = {}): Promise<any> {
      return axios({
        method: "post",
        url: this.baseURL + url,
        data,
        headers: this.getAccessToken()
          ? { ...this.getHeaders(), "Content-Type": "multipart/form-data" }
          : {},
        ...config,
      });
    }
  
    request(config = {}) {
      return axios(config);
    }
  }
  
  export default APIService;