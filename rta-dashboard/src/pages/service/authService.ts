import apiClient from "./index";

interface LoginResponse {
  token: string;
  user: {
    email: string;
    role: string;
    department: string;
  };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", { email, password });
  return response.data;
};