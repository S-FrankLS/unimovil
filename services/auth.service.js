import { axiosInstance } from '../utils/axios';

export const authService = {
    register: async (userData) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            console.log(response);

            return response;
        } catch (error) {
            throw error;
        }
    }
};