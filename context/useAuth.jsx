// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
});

const AUTH_KEY = "@auth_data";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar el estado de autenticación al iniciar la app
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
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveAuthData = async (userData) => {
    try {
      const authData = {
        user: userData,
        timestamp: new Date().getTime(),
      };
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  const clearAuthData = async () => {
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error("Error clearing auth data:", error);
    }
  };

  const login = async (email, password) => {
    try {
      // Aquí irían las validaciones con tu API
      // Por ahora solo simulamos un login exitoso
      if (email && password) {
        const userData = { email };
        setIsAuthenticated(true);
        setUser(userData);
        await saveAuthData(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error en login:", error);
      return false;
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
    return null; // O un componente de loading
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
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
