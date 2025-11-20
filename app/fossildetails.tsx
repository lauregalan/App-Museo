import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Pressable, 
  Dimensions 
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "@react-navigation/native";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface InfoBadgeProps {
  // Esto asegura que solo puedas pasar nombres válidos de íconos de Ionicons
  icon: keyof typeof Ionicons.glyphMap; 
  label: string;
  value: string | number | undefined | null;
}
// Componente auxiliar para los datos técnicos (Icono + Título + Valor)
const InfoBadge = ({ icon, label, value } : InfoBadgeProps) => {
  const colors = useThemeColor()
  return(
  <View style={[styles.infoBadge, {backgroundColor: colors.background}]}>
    <View style={styles.iconContainer}>
      <Ionicons name={icon} size={22} color="#D98E32" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={[styles.infoLabel, {color: colors.secondary}]}>{label}</Text>
      <Text style={[styles.infoValue, {color: colors.text}]}>{value || "No especificado"}</Text>
    </View>
  </View>
)};

export default function FossilDetail() {
  const { fossil } = useLocalSearchParams<{ fossil: string }>();
  
  if (!fossil) return null;
  const data = JSON.parse(fossil);
  const frontImage = data.images?.find((img: { isFront: any; }) => img.isFront);

  const colors = useThemeColor()
  return (
    <View style={styles.mainContainer}>
      {/* Ocultamos el header nativo */}
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- IMAGEN DE FONDO (HEADER) --- */}
      <View style={styles.imageHeaderContainer}>
        {frontImage ? (
          <Image
            source={{ uri: `${process.env.EXPO_PUBLIC_API_URL}/${frontImage.url}` }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.mainImage, { backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }]}>
             <Ionicons name="image-outline" size={50} color="#aaa" />
          </View>
        )}
        
        {/* Gradiente o capa oscura para que resalte el botón volver */}
        <View style={styles.imageOverlay} />
      </View>

      {/* Botón Volver */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </Pressable>

      {/* --- CONTENIDO (SHEET) --- */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Espaciador invisible para revelar la imagen */}
        <View style={{ height: SCREEN_HEIGHT * 0.4 }} />

        <View style={[styles.sheetContainer, {backgroundColor: colors.background}]}>
          {/* Decoración Handle */}
          <View style={styles.dragHandle} />

          {/* Título Principal */}
          <Text style={[styles.title, {color: colors.text}]}>{data.name}</Text>
          
          {/* Fila de Datos Clave (Edad y Ubicación) */}
          <View style={styles.gridContainer}>
            {data.age && (
              <InfoBadge 
                icon="time-outline" 
                label="Antigüedad" 
                value={data.age}
              />
            )}
            {data.location && (
              <InfoBadge 
                icon="location-outline" 
                label="Hallazgo" 
                value={data.location} 
              />
            )}
            {data.photographers?.length > 0 && (
               <InfoBadge 
                icon="camera-outline" 
                label="Fotografía" 
                value={data.photographers.join(", ")} 
              />
            )}
          </View>

          <View style={styles.divider} />

          <Text style={[styles.sectionTitle, {color: colors.text}]}>Descripción Científica</Text>
          <Text style={[styles.textContent, {color: colors.secondary}]}>{data.description}</Text>

          {/* Espacio final */}
          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // --- Header Styles ---
  imageHeaderContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: SCREEN_HEIGHT * 0.5, // La imagen ocupa el 50% de la pantalla
    zIndex: 0,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  // --- Sheet (Contenido Blanco) ---
  sheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 25,
    paddingTop: 15,
    minHeight: SCREEN_HEIGHT * 0.6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10, // Sombra hacia arriba en Android
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 25,
    letterSpacing: -0.5,
  },
  
  // --- Grid de Información ---
  gridContainer: {
    gap: 15,
    marginBottom: 25,
  },
  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFAFA", // Gris muy clarito
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FFF8F0", // Fondo naranja pálido
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#333",
    fontWeight: "500",
  },

  // --- Texto ---
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 10,
  },
  textContent: {
    fontSize: 16,
    color: "#555", // Gris oscuro para lectura
    lineHeight: 26,
    fontWeight: "400",
  },
});