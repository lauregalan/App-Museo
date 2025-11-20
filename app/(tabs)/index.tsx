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
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "../hooks/useAuth";
import { router } from "expo-router";
//import { GEOFENCING_TASK } from "../../tasks/geofencing";

export default function Home() {
  
  const { data, isLoading, error, refetch } = useNews(); 
  const [refreshing, setRefreshing] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); 
  const { logout, isAuthenticated } = useAuth(); 
  
  const handleLogout = async () => {
    await logout(); 
    setMenuVisible(false);
    router.dismissAll();
    console.log("Auth:", { isAuthenticated });

  };

  const handleLogin = () => {
    setMenuVisible(false);
    router.dismissAll();
    console.log("Auth:", { isAuthenticated });
  };

  const toggleMenu = () => setMenuVisible(!menuVisible);

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
    if (refetch) await refetch(); 
    setTimeout(() => setRefreshing(false), 1500);
  }, [refetch]);

  if (isLoading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#D98E32" />
        <Text style={styles.loadingText}>Cargando cultura...</Text>
      </View>
    );
  }

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

  const colors = useThemeColor()
  return (
    <LinearGradient
      colors={[colors.superLight, colors.background]} 
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
          <View style={styles.topBar}>
            <View>
              <Text style={[styles.dateText, {color: colors.secondary}]}>{getTodayDate().toUpperCase()}</Text>
              <Text style={[styles.greetingText, {color: colors.text}]}>Hola, Visitante</Text>
            </View>
            
            {/* Botón de Perfil o Menú */}
            <Pressable onPress={toggleMenu} style={[styles.profileButton,]}>
               <Ionicons name="person" size={20} color="#D98E32"/>
            </Pressable>
          </View>

            {/* --- MENÚ FLOTANTE (CONDICIONAL) --- */}
                {menuVisible && (
                    <View style={styles.dropdownMenu}>
                        {isAuthenticated ? (
                            // Si hay usuario logueado
                            <>
                                <View style={styles.menuHeader}>
                                    <Text style={styles.menuUserText} numberOfLines={1}>
                                        Usuario simona!
                                    </Text>
                                </View>
                                <View style={styles.divider} />
                                <Pressable onPress={handleLogout} style={styles.menuItem}>
                                    <Ionicons name="log-out-outline" size={18} color="#D32F2F" />
                                    <Text style={[styles.menuItemText, { color: "#D32F2F" }]}>
                                        Cerrar Sesión
                                    </Text>
                                </Pressable>
                            </>
                        ) : (
                            // Si NO hay usuario (invitado)
                            <Pressable onPress={handleLogin} style={styles.menuItem}>
                                <Ionicons name="log-in-outline" size={18} color="#D98E32" />
                                <Text style={styles.menuItemText}>Iniciar Sesión</Text>
                            </Pressable>
                        )}
                    </View>
                )}

          <View style={styles.sectionHeader}>
            <Text style={[styles.title, {color: colors.text}]}>Novedades</Text>
            <Text style={[styles.subtitle, {color: colors.secondary}]}>Lo último del museo para vos</Text>
          </View>

          {data && (
            <Animated.View entering={FadeInDown.duration(600).springify()}>
              <NewsCarrousel data={data} />
            </Animated.View>
          )}
          
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

  // --- ESTILOS DEL MENÚ FLOTANTE ---
  dropdownMenu: {
    position: 'absolute',
    top: 50, // Justo debajo del botón
    right: 0, // Alineado a la derecha
    width: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 8,
    // Sombra fuerte para que "flote"
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    zIndex: 1000, // Súper importante para que quede arriba
  },
  menuHeader: {
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  menuUserText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    gap: 10,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    width: "100%",
    marginVertical: 4,
  },
  dateText: {
    fontSize: 12,
    //color: "#888",
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