import React, { Dimensions, Pressable, StyleSheet, Text } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const INPUT_WIDTH = SCREEN_WIDTH * 0.85;


export default function BotonInicioSesion({ title = "Iniciar sesión", onPress }) {


  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#b99b55ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 15,
    elevation: 3, // para los usuarios de androide 
    shadowColor: "#000", // para los usuarios de la manzana
    alignItems: "center",
    width: INPUT_WIDTH, 
    marginVertical: 5,
    
  },
  
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});