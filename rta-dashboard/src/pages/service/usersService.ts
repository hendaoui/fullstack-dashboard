 
import apiClient from "./index";

export interface User {
    id: string;
    email: string;
    role: string;
    department: string;
    password: string;
}


export const fetchUsers = async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
};

export const addUser = async (user: User): Promise<User> => {
    const response = await apiClient.post<User>("/users/add", user);
    return response.data;
};

export const updateUser = async (user: User) => {
    const response = await apiClient.post<User>('/users/update/' + user?.id, user);
    return response.data;
};

export const deleteUser = async (user: User) => {
    const response = await apiClient.delete<User>('/users/delete/' + user?.id);
    return response.data;
};