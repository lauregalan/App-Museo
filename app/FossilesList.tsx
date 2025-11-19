import React from "react";
import { FlatList, View, Text, Image, StyleSheet, Pressable, ActivityIndicator, Dimensions } from "react-native";
import { Fossil } from "./types/Fossils";
import { router } from 'expo-router';
import Animated, { FadeInUp } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  data: Fossil[];
  isLoading?: boolean;
  error?: string | null;
}

const { width: screenWidth } = Dimensions.get('window');

// --- CÁLCULO DE DIMENSIONES PARA 2 COLUMNAS PERFECTAS ---
const numColumns = 2;
const cardPaddingHorizontal = 15; // Padding del listContainer
const cardMarginHorizontal = 8; // Espacio entre tarjetas
const cardTotalHorizontalSpace = cardPaddingHorizontal * 2 + (cardMarginHorizontal * (numColumns - 1));
const cardWidth = (screenWidth - cardTotalHorizontalSpace) / numColumns;


export default function FossilsList({ data, isLoading, error }: Props) {

  // ... (Tus estados de carga, error y vacío siguen igual) ...
  if (isLoading) { /* ... */ return <View style={styles.centerContainer}>...</View>; }
  if (error) { /* ... */ return <View style={styles.centerContainer}>...</View>; }
  if (!data || data.length === 0) { /* ... */ return <View style={styles.centerContainer}>...</View>; }


  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.listContainer}
      numColumns={numColumns} // 2 columnas
      
      // La clave para que se vea bien es el 'renderItem' y los estilos de la tarjeta
      renderItem={({ item, index }) => {
        const frontImage = item.images.find(img => img.isFront);

        return (
          <Animated.View 
            entering={FadeInUp.delay(index * 50).duration(500).springify()}
            // Aplicamos el margen derecho e inferior aquí
            style={[styles.cardWrapper, { 
              marginRight: (index % numColumns !== numColumns - 1) ? cardMarginHorizontal : 0, // Margen derecho si no es la última de la fila
              marginBottom: 15, // Margen inferior para todas las tarjetas
            }]}
          >
            <Pressable 
              onPress={() => router.push({ 
                pathname: "/fossildetails", 
                params: { fossil: JSON.stringify(item) } 
              })}
              style={styles.card} // Aseguramos que la tarjeta ocupe el 100% de su wrapper
            >
              {frontImage && (
                <Image
                  source={{ uri: `http://192.168.1.16:3001/${frontImage.url}` }}
                  style={styles.image}
                  resizeMode="cover" 
                />
              )}

              <View style={styles.content}>
                <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
                                
                <Pressable style={styles.detailsButton}>
                  <Text style={styles.detailsButtonText}>Ver detalles</Text>
                  <Ionicons name="chevron-forward" size={16} color="#D98E32" />
                </Pressable>
              </View>
            </Pressable>
          </Animated.View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  // ... (Tus estilos para centerContainer, loadingText, errorText, emptyText siguen igual) ...
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f9f9f9", },
  loadingText: { marginTop: 10, fontSize: 16, color: "#666", },
  errorText: { textAlign: "center", fontSize: 16, color: "#D32F2F", marginTop: 10, },
  emptyText: { textAlign: "center", fontSize: 16, color: "#888", marginTop: 10, },


  listContainer: {
    paddingHorizontal: cardPaddingHorizontal, // Padding a los costados de la lista
    paddingTop: 20,
  },
  cardWrapper: {
    // Aquí es donde se le da el ancho a cada tarjeta
    width: cardWidth, 
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    overflow: "hidden", // Crucial para que la imagen se recorte dentro del borderRadius
    flex: 1, // Permite que la tarjeta se expanda si es necesario
  },
  image: {
    width: "100%", // La imagen ocupa todo el ancho de la tarjeta
    height: 160,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    marginBottom: 10,
  },
  content: {
    paddingHorizontal: 12, // Reducido un poco para que no se apriete
    paddingBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a1a1a",
    marginBottom: 5,
    lineHeight: 22,
  },
  era: {
    fontSize: 13,
    color: "#888",
    marginBottom: 8,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    justifyContent: "flex-start",
  },
  detailsButtonText: {
    color: "#D98E32",
    fontWeight: "600",
    fontSize: 14,
    marginRight: 5,
  },
});