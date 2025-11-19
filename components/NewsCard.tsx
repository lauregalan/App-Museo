import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

interface NewsCardProps {
  title: string;
  date: string;
  summary: string;
  imageUrl: string;
  style?: object;
}

const NewsCard = ({
  title,
  date,
  summary,
  imageUrl,
  style = {},
}: NewsCardProps) => {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        {/* OVERLAY suave para que el texto nunca compita con la imagen */}
        <View style={styles.overlay} />
      </View>

      <View style={styles.content}>
        <Text style={styles.date}>{date}</Text>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.summary} numberOfLines={3}>
          {summary}
        </Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Leer más →</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default NewsCard;

const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 0,
    overflow: "hidden",    // Sombras god
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: 200,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.10)", // leve oscurito facherito
  },

  content: {
    padding: 18,
  },

  date: {
    fontSize: 13,
    color: "#6b7280", // gray-500
    marginBottom: 4,
    fontFamily: "CormorantUnicaseBold",
  },

  title: {
    fontSize: 20,
    fontFamily: "CormorantUnicaseBold",
    //fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },

  summary: {
    fontSize: 15,
    color: "#4b5563", // gray-600
    marginBottom: 14,
    fontFamily: "CormorantUnicaseBold",
    lineHeight: 20,
  },

  button: {
    marginTop: 4,
    paddingVertical: 6,
  },

  buttonText: {
    color: "#d97706", // amber-600
    fontWeight: "600",
    fontFamily: "CormorantUnicaseBold",
    fontSize: 16,
  },
});
