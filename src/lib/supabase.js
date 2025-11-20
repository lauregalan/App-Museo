import { createClient } from '@supabase/supabase-js';

// 1. Leer variables de entorno (Ejemplo para Vite)
// Si usas Next.js cambia 'import.meta.env.VITE_...' por 'process.env.NEXT_PUBLIC_...'
const supabaseUrl = import.meta.env.EXPO_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.EXPO_SUPABASE_ANON_KEY;

// 2. Crear la instancia
export const supabase = createClient(supabaseUrl, supabaseAnonKey);