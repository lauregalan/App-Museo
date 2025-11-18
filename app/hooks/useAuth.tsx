import { useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.1.19:3001";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
  }

  return {
    login,
    logout,
    loading,
    error,
  };
}
