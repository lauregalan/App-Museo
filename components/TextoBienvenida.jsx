import react from "react";
import { Text, StyleSheet } from "react-native";

export default function TextoBienvenida({ title = "Bienvenido" }) {
  return  <Text style={styles.title}>{title}</Text>;
}
const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "left",
    width: "85%",
  }
}); 