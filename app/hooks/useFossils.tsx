import { useQuery } from "@tanstack/react-query";
import { Fossil } from "../types/Fossils";

const API_URL = `${process.env.EXPO_PUBLIC_API_URL}/fossils`; // tu endpoint real

async function fetchFossils(): Promise<Fossil[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al cargar fósiles");
  return res.json();
}

export function useFossils() {
  return useQuery<Fossil[]>({
    queryKey: ["fossils"],
    queryFn: fetchFossils,
  });
}
