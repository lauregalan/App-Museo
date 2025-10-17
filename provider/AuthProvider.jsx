import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

const AuthContext = createContext({
  loading: true,
  session: null,
});


export default function AuthProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setLoading(false);
        return;
      }

      if (data.session) {
        setSession(data.session);
      } else {
        router.replace("/signin");
      }

      setLoading(false);
    }

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        setSession(session);
        setLoading(false);

        if (session) {
          router.replace("/"); // Ir al home
        } else {
          router.replace("/signin");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ loading, session }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
