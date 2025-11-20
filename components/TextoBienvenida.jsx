import react from "react";
import { Text, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";


export default function TextoBienvenida({ title = "Bienvenido" }) {
  const colors = useThemeColor();
  return  <Text style={[styles.title, {color: colors.text}]}>{title}</Text>;
}


const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    //fontWeight: "bold",
    fontFamily: "CormorantUnicaseBold",
    marginBottom: 24,
    textAlign: "left",
    width: "85%",
    fontFamily: "CormorantUnicaseBold",

  }
});