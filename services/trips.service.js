// services/trips.service.js
import { axiosInstance } from '../utils/axios';

export const tripsService = {
    // Obtener todos los viajes
    getAllTrips: async () => {
        try {
            const response = await axiosInstance.get('/trips/getAllTrips');
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Obtener un viaje específico por ID
    getTripById: async (id) => {
        try {
            const response = await axiosInstance.get(`/trips/getTrips/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Crear un nuevo viaje
    createTrip: async (tripData) => {
        try {
            const response = await axiosInstance.post('/trips/createTrip', tripData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Actualizar un viaje existente
    updateTrip: async (id, tripData) => {
        try {
            const response = await axiosInstance.put(`/trips/updateTrip/${id}`, tripData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    // Eliminar un viaje
    deleteTrip: async (id) => {
        try {
            const response = await axiosInstance.delete(`/trips/deleteTrip/${id}`);
            return response;
        } catch (error) {
            throw error;
        }
    }
};