import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("session_token");

      setIsAuthenticated(!!token);

      setLoading(false);
    };

    checkToken();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Credenciales inválidas");
        return false;
      }

      const token = data?.access_token;

      if (token) {
        await SecureStore.setItemAsync("session_token", token);
        setIsAuthenticated(true);
      }

      return true;
    } catch (err) {
      setError("Error de conexión. Fijate el backend o la red.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await SecureStore.deleteItemAsync("session_token");
    setIsAuthenticated(false)
  }


  return {
    login,
    logout,
    loading,
    error,
    isAuthenticated,
  };
}
