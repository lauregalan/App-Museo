import React, { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator, 
  ScrollView, 
  RefreshControl, 
  Pressable,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de tenerlo instalado
import { useNews } from "../hooks/useNews";
import NewsCarrousel from "@/app/NewsCarrousel";
import * as Location from "expo-location";

export default function Home() {
  // Suponiendo que tu hook tiene una función refetch, si no, el refresh será visual
  const { data, isLoading, error, refetch } = useNews(); 
  const [refreshing, setRefreshing] = useState(false);


  const getTodayDate = () => {
    const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "short",
  };

  return new Date().toLocaleDateString("es-AR", options);
};


  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (refetch) await refetch(); // Si tu hook soporta refetch
    // Simulamos una espera si no hay refetch real
    setTimeout(() => setRefreshing(false), 1500);
  }, [refetch]);

  // --- ESTADO DE CARGA ---
  if (isLoading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D98E32" />
        <Text style={styles.loadingText}>Cargando cultura...</Text>
      </View>
    );
  }

  // --- ESTADO DE ERROR ---
  if (error) {
    return (
      <View style={styles.center}>
        <Ionicons name="cloud-offline-outline" size={48} color="#888" />
        <Text style={styles.errorText}>
          Hubo un problema cargando el inicio.
        </Text>
        <Pressable style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <LinearGradient
      // Un degradado sutil: Blanco arriba -> Gris cálido muy suave abajo
      colors={["#FFFFFF", "#F9F5F0"]} 
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container} edges={["top"]}>
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh}
              colors={["#D98E32"]} // Color del spinner en Android
              tintColor="#D98E32"  // Color del spinner en iOS
            />
          }
        >
          {/* --- HEADER SUPERIOR --- */}
          <View style={styles.topBar}>
            <View>
              <Text style={styles.dateText}>{getTodayDate().toUpperCase()}</Text>
              <Text style={styles.greetingText}>Hola, Visitante</Text>
            </View>
            
            {/* Botón de Perfil o Menú */}
            <Pressable style={styles.profileButton}>
               <Ionicons name="person" size={20} color="#D98E32" />
            </Pressable>
          </View>

          {/* --- TÍTULO DE SECCIÓN --- */}
          <View style={styles.sectionHeader}>
            <Text style={styles.title}>Novedades</Text>
            <Text style={styles.subtitle}>Lo último del museo para vos</Text>
          </View>

          {/* --- CARRUSEL CON ANIMACIÓN --- */}
          {data && (
            <Animated.View entering={FadeInDown.duration(600).springify()}>
              <NewsCarrousel data={data} />
            </Animated.View>
          )}
          
          {/* Espacio extra abajo para que no se corte */}
          <View style={{ height: 100 }} />

        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // --- Header Styles ---
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 10,
  },
  dateText: {
    fontSize: 12,
    color: "#888",
    fontFamily: "CormorantUnicaseBold",
    //fontWeight: "600",
    letterSpacing: 1,
  },
  greetingText: {
    fontSize: 18,
    fontFamily: "CormorantUnicaseBold",
    color: "#333",
  },
  profileButton: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F0F0F0"
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  title: {
    fontSize: 32,
    fontFamily: "CormorantUnicaseBold",
    //fontWeight: "700",
    color: "#1a1a1a",
  },
  subtitle: {
    fontFamily: "CormorantUnicaseBold",
    fontSize: 18,
    color: "#666",
    marginTop: 4,
  },
  // --- Error/Loading Styles ---
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 14,
  },
  errorText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginTop: 10,
    paddingHorizontal: 40,
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#D98E32",
    borderRadius: 25,
  },
  retryText: {
    color: "white",
    fontWeight: "bold",
  }
});