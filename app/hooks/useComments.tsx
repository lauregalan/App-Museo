import { useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}`;

export const useComments = () => {
  const [error, setError] = useState<string | null>(null);

  const postMessage = async (idNew: string, message: string) => {
    try {

      const token = await SecureStore.getItemAsync("session_token");


      if (!token) throw new Error("No hay token disponible");
        
      const res = await fetch(`${API_URL}/news/${idNew}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text :message }),
      });


      const data = await res.json();

      if (!res.ok) {
        console.log("ERROR DEL SERVIDOR:", data);
        setError(data.message || "No se pudo postear el mensaje :(");
        return null;
      }


      return data;

    } catch (err: any) {
      console.log("ERROR try/catch:", err);
      setError(err.message);
      return null;
    }
  };

  return { postMessage, error };
};
