// hooks/useTrips.js
import { useState, useCallback } from 'react';
import { tripsService } from '../services/trips.service';

export const useTrips = () => {
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const fetchTrips = useCallback(async (showLoading = true) => {
        try {
            if (showLoading) setIsLoading(true);
            const response = await tripsService.getAllTrips();
            setTrips(response);
            setError(null);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching trips:', error);
        } finally {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    const createTrip = async (tripData) => {
        try {
            const response = await tripsService.createTrip(tripData);
            // Actualizar la lista de viajes después de crear uno nuevo
            await fetchTrips(false);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const updateTrip = async (id, tripData) => {
        try {
            const response = await tripsService.updateTrip(id, tripData);
            // Actualizar la lista de viajes después de modificar uno
            await fetchTrips(false);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const deleteTrip = async (id) => {
        try {
            const response = await tripsService.deleteTrip(id);
            // Actualizar la lista de viajes después de eliminar uno
            await fetchTrips(false);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        fetchTrips(false);
    };

    return {
        trips,
        isLoading,
        error,
        isRefreshing,
        fetchTrips,
        createTrip,
        updateTrip,
        deleteTrip,
        handleRefresh
    };
};