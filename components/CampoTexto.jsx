import { useTheme } from "@react-navigation/native";
import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import {useThemeColor} from "../hooks/useThemeColor";

export default function CampoTexto({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry 
}) {
  const colors = useThemeColor();
  
  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, {color: colors.secondary}]}>
          {label} <Text style={styles.required}>*</Text>
        </Text>
      )}
      <TextInput 
        style={[styles.input, { borderColor: colors.light, color: colors.text }]}
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
    fontFamily: "CormorantUnicaseBold",
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
    //backgroundColor: "#fff",
    fontSize: 16,
  }
});