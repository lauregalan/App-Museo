import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function BotonInicioSesion({
  title = "Iniciar sesión",
  onPress,
  isPrimary = true,  
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, !isPrimary && styles.textSecondary]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    borderRadius: 6, // Bordes más cuadrados como la imagen
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  primary: {
    backgroundColor: "#D98E32", // Color Ocre/Naranja de la imagen
    elevation: 2,
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D98E32", // Mismo color para el borde
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase", // La imagen usa mayúsculas en el botón
  },
  textSecondary: {
    color: "#333", // Texto oscuro para el botón de registro
    textTransform: "none", // "Registrate aquí" no está todo en mayúsculas
    fontWeight: "600",
  },
});