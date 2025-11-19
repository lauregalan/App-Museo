import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/app/types/newsItem";

const API_NEWS_URL = `${process.env.EXPO_PUBLIC_API_URL}/news`;

async function fetchNews(): Promise<NewsItem[]> {
  const response = await fetch(API_NEWS_URL);
  if (!response.ok) throw new Error("Error en la API de noticias");
  return response.json();
}

export function useNews() {
  return useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: fetchNews,
  });
}
