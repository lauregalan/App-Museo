import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import BotonInicioSesion from "./BotonInicioSesion"; // Importamos el botón

export default function NoRegistrado() {
  const irRegistro = () => {
    router.push("/register");
  };

  return (
    <View style={styles.container}>
      {/* Línea divisoria sutil */}
      <View style={styles.divider} />
      
      <Text style={styles.text}>¿No tienes una cuenta?</Text>

      {/* Reutilizamos el botón en modo secundario */}
      <BotonInicioSesion 
        title="Registrate aquí" 
        onPress={irRegistro} 
        isPrimary={false} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#eee",
    marginBottom: 20,
  },
  text: {
    color: "#555",
    fontSize: 16,
    marginBottom: 5,
    textAlign: "left",
    width: "85%",
  },
});