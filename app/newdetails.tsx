import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { NewsItem } from "./types/newsItem";
export default function NewDetail() {
  
  const { NewsItem } = useLocalSearchParams<{ NewsItem: string }>();

  const data = JSON.parse(NewsItem);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: `http://192.168.0.101:3001/${data.image}` }}
        style={styles.mainImage}
      />

      <Text style={styles.title}>{data.title}</Text>

      <Text style={styles.title}>{data.date}</Text>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.text}>{data.content}</Text>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingHorizontal: 5,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: "100%",
    height: 260,
    borderRadius: 0,
    marginBottom: 18,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12    ,
  },
  sectionTitle: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 10, 
    color: "#444",
    lineHeight: 22,
  },
});
