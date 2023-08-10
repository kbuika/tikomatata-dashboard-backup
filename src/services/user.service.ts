import APIService from "./api.service";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
class UserService extends APIService {
    constructor() {
        super(`${API_BASE_URL}/api/v1`);
    }

    currentUserConfig() {
        return {
            url: `${this.baseURL}/api/v1/auth/user-info`,
            headers: this.getHeaders(),
        };
    }

    async currentUser(): Promise<any> {
        return this.get("/auth/user-info")
        .then((response) => {
            return response.data.data;
        })
        .catch((error) => {
            throw error;
        });
    };

}

export default new UserService();