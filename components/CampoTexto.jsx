import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

export default function CampoTexto({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry 
}) {
  return (
    <View style={styles.container}>
      {label && (
        <Text style={styles.label}>
          {label} <Text style={styles.required}>*</Text>
        </Text>
      )}
      <TextInput 
        style={styles.input}
        placeholder={placeholder} 
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#999"      
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "85%",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
    fontWeight: "500",
  },
  required: {
    color: "red",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc", // Gris suave como en la imagen
    padding: 12,
    borderRadius: 4, // Bordes menos redondeados según la imagen
    backgroundColor: "#fff",
    fontSize: 16,
  }
});