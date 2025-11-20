import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Pressable, 
  SafeAreaView 
} from "react-native";
import { router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useTheme } from "@react-navigation/native";

{/* hardcodeado de momento, no hay nada en la API jaja*/ }
const AVAILABLE_DATES : VisitDate[]= [
  { id: '1', dayName: 'MIÉRCOLES', dayNumber: '20', month: 'NOV', status: 'AVAILABLE', hours: '09:00 - 18:00' },
  { id: '2', dayName: 'JUEVES', dayNumber: '21', month: 'NOV', status: 'LIMITED', hours: '09:00 - 18:00' },
  { id: '3', dayName: 'VIERNES', dayNumber: '22', month: 'NOV', status: 'FULL', hours: '09:00 - 20:00' },
  { id: '4', dayName: 'SÁBADO', dayNumber: '23', month: 'NOV', status: 'AVAILABLE', hours: '10:00 - 20:00' },
  { id: '5', dayName: 'DOMINGO', dayNumber: '24', month: 'NOV', status: 'AVAILABLE', hours: '10:00 - 14:00' },
];

interface VisitDate {
  id: string;
  dayName: string;
  dayNumber: string;
  month: string;
  status: 'AVAILABLE' | 'LIMITED' | 'FULL'; 
  hours: string;
}

const StatusBadge = ({ status } : {status : string}) => {
  let color = "#10B981"; 
  let text = "DISPONIBLE";
  let bg = "#ECFDF5";

  if (status === 'LIMITED') {
    color = "#D97706"; 
    text = "ÚLTIMOS LUGARES";
    bg = "#FFFBEB";
  } else if (status === 'FULL') {
    color = "#EF4444";
    text = "AGOTADO";
    bg = "#FEF2F2";
  }

  const colors = useThemeColor()
  return (
    <View style={[styles.badge, { backgroundColor: bg, borderColor: color }]}>
      <View style={[styles.badgeDot, { backgroundColor: color }]} />
      <Text style={[styles.badgeText, { color: color }]}>{text}</Text>
    </View>
  );
};

export default function VisitsScreen() {

  const handlePress = (item : VisitDate) => {
    if (item.status === 'FULL') return;
    console.log("Reservar fecha:", item.id);
    router.push({ pathname: '/comprar-entrada', params: { item: JSON.stringify(item) } });
  };

  const colors = useThemeColor()
  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.header}>
        <Text style={[styles.headerTitle, {color: colors.text}]}>VISITAS</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <View style={styles.introContainer}>
        <Text style={[styles.introTitle, {color: colors.secondary}]}>Planifica tu recorrido</Text>
        <Text style={[styles.introText, {color: colors.secondary}]}>
          Seleccioná una fecha para reservar tu entrada y evitar filas.
        </Text>
      </View>

      <FlatList
        data={AVAILABLE_DATES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable 
            style={({ pressed }) => [
              styles.card,
              {backgroundColor: colors.darklight},
              item.status === 'FULL' && styles.cardDisabled,
              pressed && styles.cardPressed
            ]}
            onPress={() => handlePress(item)}
          >
            {/* Columna Izquierda: Calendario Visual */}
            <View style={[styles.dateBlock, {backgroundColor: colors.background}]}>
              <Text style={styles.monthText}>{item.month}</Text>
              <Text style={[styles.dayNumberText, {color: colors.secondary}]}>{item.dayNumber}</Text>
            </View>

            {/* Columna Central: Info */}
            <View style={styles.infoBlock}>
              <Text style={[styles.dayNameText, {color: colors.text}]}>{item.dayName}</Text>
              <Text style={[styles.hoursText, {color: colors.secondary}]}>Horario: {item.hours}</Text>
              <StatusBadge status={item.status} />
            </View>

            {/* Columna Derecha: Acción */}
            <View style={styles.actionBlock}>
              {item.status !== 'FULL' ? (
                <View style={styles.arrowCircle}>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </View>
              ) : (
                <Ionicons name="lock-closed-outline" size={24} color="#ccc" />
              )}
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 50, 
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "CormorantUnicaseBold",
    letterSpacing: 2,
    color: "#1a1a1a",
  },
  introContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 28,
    fontFamily: "CormorantUnicaseBold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  introText: {
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    fontFamily: "CormorantUnicaseBold",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    // Sombra suave
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: "transparent",
  },
  cardPressed: {
    borderColor: "#D98E32", // Borde naranja al presionar
    transform: [{ scale: 0.99 }],
  },
  cardDisabled: {
    opacity: 0.6,
    backgroundColor: "#F5F5F5",
  },

  // Bloque Fecha (Izq)
  dateBlock: {
    backgroundColor: "#FFF8F0", // Naranja muy pálido
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFEAD0",
  },
  monthText: {
    fontSize: 12,
    fontFamily: "CormorantUnicaseBold",
    color: "#D98E32",
    marginBottom: 2,
  },
  dayNumberText: {
    fontSize: 26,
    fontFamily: "CormorantUnicaseBold",
    color: "#1a1a1a",
  },

  // Bloque Info (Centro)
  infoBlock: {
    flex: 1,
    marginLeft: 16,
  },
  dayNameText: {
    fontSize: 18,
    fontFamily: "CormorantUnicaseBold",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  hoursText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 8,
    fontFamily: "CormorantUnicaseBold",
  },

  // Bloque Acción (Der)
  actionBlock: {
    justifyContent: "center",
    alignItems: "center",
  },
  arrowCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1a1a1a", // Botón negro elegante
    justifyContent: "center",
    alignItems: "center",
  },

  // Badge Component Styles
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});