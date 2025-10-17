import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";

export default function NoRegistrado() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>¿No tenés cuenta?</Text>

      <Pressable onPress={() => router.push("/PantallaRegistro")}>
        <Text style={styles.link}>Registrate</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#666",
    fontSize: 14,
  },
  link: {
    color: "#b99b55ff",
    fontWeight: "bold",
    marginLeft: 6,
  },
});
