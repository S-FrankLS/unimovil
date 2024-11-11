// AuthContext.js actualizado
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "../services/auth.service";
import { axiosInstance } from "../utils/axios";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
});

const AUTH_KEY = "@auth_data";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    try {
      const authDataString = await AsyncStorage.getItem(AUTH_KEY);
      if (authDataString) {
        const authData = JSON.parse(authDataString);
        setIsAuthenticated(true);
        setUser(authData.user);
        // Configurar el token en axios
        if (authData.token) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;
        }
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Guardar los datos de autenticación en el dispositivo
  const saveAuthData = async (userData, token) => {
    try {
      const authData = {
        user: userData,
        token,
        timestamp: new Date().getTime(),
      };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authData));
      // Configurar el token en axios
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
      // Limpiar el token de axios
      delete axiosInstance.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password });
      if (response.userType) {
        setIsAuthenticated(true);
        setUser({ role: response.userType });
        await saveAuthData(response.userType, response.token ? response.token : 'this is not a token');
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      console.log("Registro exitoso:", response);

      return response;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setIsAuthenticated(false);
      setUser(null);
      await clearAuthData();
    } catch (error) {
      console.error("Error en logout:", error);
    }
  };

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        register,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};