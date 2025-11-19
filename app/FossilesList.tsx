import { FlatList, View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Fossil } from "./types/Fossils";
import {router} from 'expo-router'
interface Props {
  data: Fossil[];
}

export default function FossilsList({ data }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{ paddingTop: 30 }}
      renderItem={({ item }) => {
        const frontImage = item.images.find(img => img.isFront);

        return (
          <Pressable onPress={ () =>router.push({pathname: "/fossildetails", params: { fossil: JSON.stringify(item) }})}>
            <View style={styles.card}>
              {frontImage && (
                <Image
                  source={{ uri: `http://192.168.1.16:3001/${frontImage.url}` }}
                  style={styles.image}
                />
              )}

              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.name}</Text>
                <Text numberOfLines={3}>{item.description}</Text>
                <Text style={styles.photographer}>
                  {item.photographers?.join(", ")}
                </Text>
              </View>
            </View>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 0,
    marginBottom: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 0,
    marginRight: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  photographer: {
    marginTop: 4,
    fontStyle: "italic",
    color: "#555",
  },
});
