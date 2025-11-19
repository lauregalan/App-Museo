import React from "react";
import { FlatList, View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import NewsCard from "../components/NewsCard";
import { Fossil } from "./types/Fossils";
import { NewsItem } from "@/app/types/newsItem";
import { router } from "expo-router";

const API_NEWS_URL = "http://192.168.1.16:3001/news";
const API_BASE_URL = "http://192.168.1.16:3001";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.87;
const SPACING = 60;
const SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

const styles = StyleSheet.create({
  loader: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});

interface Props {
  data: NewsItem[];
}

export default function NewsCarousel({ data }: Props) {

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("es-AR", {
      day: "numeric",
      month: "long",
    }).format(date);
  }

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Pressable onPress= {()=> router.push({pathname: "/newdetails", params: { NewsItem: JSON.stringify(item) }})}>
          <NewsCard
            title={item.title}
            date={formatDate(item.date)}
            summary={item.content}
            imageUrl={`${API_BASE_URL}/${item.image}`}
            style={{ width: CARD_WIDTH }}
          />
          </Pressable>

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
