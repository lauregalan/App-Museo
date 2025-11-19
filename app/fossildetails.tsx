import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import {Fossil} from "../app/types/Fossils"

export default function FossilDetail() {
  
  const { fossil } = useLocalSearchParams<{ fossil: string }>();

  const data = JSON.parse(fossil);

  const frontImage = data.images?.find((img: { isFront: any; }) => img.isFront);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {frontImage && (
        <Image
          source={{ uri: `http://192.168.0.101:3001/${frontImage.url}` }}
          style={styles.mainImage}
        />
      )}

      <Text style={styles.title}>{data.name}</Text>

      <Text style={styles.sectionTitle}>Descripción</Text>
      <Text style={styles.text}>{data.description}</Text>

      {data.photographers?.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Fotógrafos</Text>
          <Text style={styles.text}>
            {data.photographers.join(", ")}
          </Text>
        </>
      )}

      {data.age && (
        <>
          <Text style={styles.sectionTitle}>Edad geológica</Text>
          <Text style={styles.text}>{data.age}</Text>
        </>
      )}

      {data.location && (
        <>
          <Text style={styles.sectionTitle}>Ubicación encontrada</Text>
          <Text style={styles.text}>{data.location}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  mainImage: {
    width: "100%",
    height: 260,
    borderRadius: 12,
    marginBottom: 18,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 18,
    marginBottom: 6,
  },
  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },
});
