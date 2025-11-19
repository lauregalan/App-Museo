import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { useAuth } from "../app/hooks/useAuth"
import { router } from "expo-router";

  

export default function SectionTitle() {
  const [menuVisible, setMenuVisible] = useState(false);

  const {logout} = useAuth();

  const handleLogout = () => {
    setMenuVisible(false);
    router.replace("/");
    logout();
    Alert.alert("Cerrar Sesión", "Has cerrado sesión correctamente."); //aca va la logica del logout
  };

  return (
    <View style={[styles.container, { zIndex: 1000 }]}>
      <Text style={styles.sectionTitle}>Noticias</Text>

      <View style={styles.rightContainer}>
        
        <Pressable onPress={() => setMenuVisible(!menuVisible)}>
          <Ionicons name="person" size={28} color="#fff" />
        </Pressable>

        {menuVisible && (
          <View style={styles.dropdownMenu}>
            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="red" />
              <Text style={styles.menuText}>Cerrar Sesión</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1, // Importante para que el menú se superponga a otros elementos si es necesario
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "black",
    paddingHorizontal: 30,
    paddingTop: 10,
    marginTop: 8,
    letterSpacing: 1,
  },
  // Nuevo contenedor para alinear el icono y su menú a la derecha
  rightContainer: {
    marginRight: 30,
    marginTop: 20, // Moví tus márgenes aquí
    position: 'relative', // Necesario para que el absolute funcione dentro
  },
  // Estilos del menú flotante
  dropdownMenu: {
    position: 'absolute',
    top: 35,
    right: 0, 
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: 150,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '500',
    marginLeft: 10,
  }
});