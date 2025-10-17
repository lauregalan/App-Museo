import react from "react";
import { Text, StyleSheet } from "react-native";

export default function TextoBienvenida({ title = "Bienvenido" }) {
  return <Text style={styles.text}>{title}</Text>;
}
const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#9a8045ff",
  },
}); 