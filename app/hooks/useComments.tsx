import { useState } from "react";
import * as SecureStore from "expo-secure-store";

const API_URL = "http://192.168.1.16:3001";

export const useComments = () => {
  const [error, setError] = useState<string | null>(null);

  const postMessage = async (idNew: string, message: string) => {
    try {
      console.log("🟦 Enviando comentario...");
      console.log("➡️ ID Noticia:", idNew);
      console.log("➡️ Mensaje:", message);

      const token = await SecureStore.getItemAsync("session_token");

      console.log("🔑 TOKEN:", token);

      if (!token) throw new Error("No hay token disponible");
        
      console.log("🌍 POST a:", `${API_URL}/news/${idNew}/comments`);

      const res = await fetch(`${API_URL}/news/${idNew}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text :message }),
      });

      console.log("📥 RAW RESPONSE:", res);

      const data = await res.json();

      console.log("📦 BODY RESPONSE:", data);

      if (!res.ok) {
        console.log("❌ ERROR DEL SERVIDOR:", data);
        setError(data.message || "No se pudo postear el mensaje :(");
        return null;
      }


      return data;

    } catch (err: any) {
      console.log("🔥 ERROR try/catch:", err);
      setError(err.message);
      return null;
    }
  };

  return { postMessage, error };
};
