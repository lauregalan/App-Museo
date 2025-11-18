import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NewsItem } from "@/app/types/newsItem";
import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";

import NewsCard from "./NewsCard";

const API_NEWS_URL = "http://192.168.1.16:3001/news";
const API_BASE_URL = "http://192.168.1.16:3001";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.85;
const SPACING = 60;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

export default function NewsCarousel() {
  const query = useQuery<NewsItem[]>({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch(API_NEWS_URL);
      if (!response.ok) throw new Error("Error en la API");
      return response.json();
    },
  });

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "long",
    }).format(date);
  }

  if (query.isLoading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (query.isError) {
    return (
      <View style={styles.loader}>
        <Text style={{ color: "red" }}>No se pudieron cargar las noticias.</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={query.data}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <NewsCard
            title={item.title}
            date={formatDate(item.date)}
            summary={item.content}
            imageUrl={`${API_BASE_URL}/${item.image}`}
            style={{ width: CARD_WIDTH }}
          />
        )}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + SPACING}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE_PADDING,
          paddingVertical: 10,  
        }}
        ItemSeparatorComponent={() => <View style={{ width: SPACING }} />}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  loader: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});
