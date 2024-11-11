import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

// Crear instancia de axios con configuración base
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


// Interceptores para manejo global de errores
axiosInstance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.log('Error en la petición:', error);
        
        if (error.response) {
            // Error de respuesta del servidor
            throw new Error(error.response.data.message || 'Error en el servidor');
        } else if (error.request) {
            // Error de red
            throw new Error('Error de conexión. Verifica tu internet');
        } else {
            // Otros errores
            throw new Error('Ocurrió un error inesperado');
        }
    }
);