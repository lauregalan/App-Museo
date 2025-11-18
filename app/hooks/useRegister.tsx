import { useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.1.18:3001";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(email: string, password: string) {
    setLoading(true);
    setError(null);

    try {

      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rol: "visitor"}),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Credenciales inválidas");
        return false;
      }

      const login = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      const loginData = await login.json()

      const token = loginData?.access_token;

      if (token) {
        await SecureStore.setItemAsync("session_token", token);
      }

      return true;
    } catch (err) {
      setError("Error de conexión. Fijate el backend o la red.");
      return false;
    } finally {
      setLoading(false);
    }
  }

  return {
    register,
    loading,
    error,
  };
}
