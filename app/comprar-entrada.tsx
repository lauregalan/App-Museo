import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Pressable, 
  ScrollView,
  Alert 
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useBiometricAuth } from "./hooks/useBiometricAuth";

export default function BuyTicketScreen() {
  // Recibimos el item seleccionado de la pantalla anterior
  const params = useLocalSearchParams();
  
  const {authenticate} = useBiometricAuth()

  // Parseamos el objeto (si existe)
  const item = params.item ? JSON.parse(params.item as string) : null;

  if (!item) return null;

  const handleConfirmPayment = () => {
    Alert.alert(
      "Pago Confirmado", 
      "¡Tu entrada ha sido reservada con éxito!",
      [
        { text: "Volver al inicio", onPress: () => router.navigate("/") }
      ]
    );
  };
  const handlePress = async () => {
    const ok = await authenticate(); // dispara la biometría
    if (ok) {
      handleConfirmPayment(); // solo confirma el pago si pasó la verificación
    }
  };
  const colors = useThemeColor()
  return (
    <View style={[styles.mainContainer, {backgroundColor: colors.background}]}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1a1a1a" />
        </Pressable>
        <Text style={[styles.headerTitle, {color: colors.text}]}>FINALIZAR COMPRA</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- TARJETA DE RESUMEN (FECHA) --- */}
        <View style={styles.introContainer}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>Detalle de la visita</Text>
          <Text style={[styles.introText, {color: colors.secondary}]}>
             Estás a un paso de confirmar tu lugar. Revisa los datos antes de pagar.
          </Text>
        </View>

        <View style={[styles.summaryCard, {backgroundColor: colors.darklight}]}>
          <View style={styles.dateRow}>
            <View style={styles.calendarIcon}>
               <Ionicons name="calendar-outline" size={24} color="#D98E32"/>
            </View>
            <View>
                <Text style={[styles.label, {color: colors.secondary}]}>FECHA SELECCIONADA</Text>
                <Text style={[styles.valueBig, {color: colors.text}]}>
                    {item.dayName} {item.dayNumber} DE {item.month}
                </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
             <View style={styles.detailItem}>
                <Text style={[styles.label, {color: colors.secondary}]}>HORARIO</Text>
                <Text style={[styles.valueSmall, {color: colors.darktext}]}>{item.hours}</Text>
             </View>
             <View style={styles.detailItem}>
                <Text style={[styles.label, {color: colors.secondary}]}>VALOR ENTRADA</Text>
                <Text style={[styles.valueSmall, { color: "#D98E32" }]}>$2.500,00</Text>
             </View>
          </View>
        </View>

        {/* --- SECCIÓN QR --- */}
        <View style={styles.qrSection}>
            <Text style={[styles.qrTitle, {color: colors.text}]}>Escaneá para pagar</Text>
            <Text style={[styles.qrSubtitle, {color: colors.secondary}]}>
                Utilizá tu billetera virtual favorita para escanear el código QR.
            </Text>

            <View style={styles.qrContainer}>
                <Image
                    source={require('../assets/images/QR-pago.jpg')}
                    style={styles.qrImage}
                />
                <View style={styles.cornerTL} />
                <View style={styles.cornerTR} />
                <View style={styles.cornerBL} />
                <View style={styles.cornerBR} />
            </View>

            <View style={[styles.secureBadge, {backgroundColor: colors.darkstring}]}>
                <Ionicons name="shield-checkmark-outline" size={16} color="#10B981" />
                <Text style={styles.secureText}>Pago 100% seguro</Text>
            </View>
        </View>

      </ScrollView>

      {/* --- FOOTER (BOTÓN) --- */}
      <View style={[styles.footer, {backgroundColor: colors.background}]}>
        <Pressable 
            style={({pressed}) => [styles.payButton, pressed && { opacity: 0.9 }]}
            onPress={handlePress}
        >
            <Text style={styles.payButtonText}>YA REALICÉ EL PAGO</Text>
            <Ionicons name="checkmark-circle-outline" size={22} color="#fff" style={{marginLeft: 8}}/>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingTop: 50,
  },
  scrollContent: {
    paddingBottom: 120, // Espacio para el footer
  },
  // --- HEADER ---
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "CormorantUnicaseBold",
    letterSpacing: 2,
    color: "#1a1a1a",
  },

  // --- TEXTOS ---
  introContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: "CormorantUnicaseBold",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  introText: {
    fontSize: 15,
    color: "#666",
    lineHeight: 22,
    fontFamily: "CormorantUnicaseBold", // Manteniendo tu estilo
  },

  // --- TARJETA RESUMEN ---
  summaryCard: {
    marginHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    // Sombra
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 30,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  calendarIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#FFF8F0",
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  label: {
    fontSize: 10,
    color: "#999",
    fontWeight: "700",
    marginBottom: 2,
    letterSpacing: 1,
  },
  valueBig: {
    fontSize: 18,
    fontFamily: "CormorantUnicaseBold",
    color: "#1a1a1a",
  },
  valueSmall: {
    fontSize: 16,
    fontFamily: "CormorantUnicaseBold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#F0F0F0",
    marginVertical: 15,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },

  // --- SECCION QR ---
  qrSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  qrTitle: {
    fontSize: 22,
    fontFamily: "CormorantUnicaseBold",
    color: "#1a1a1a",
    marginBottom: 8,
  },
  qrSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: 'center',
    marginBottom: 25,
    maxWidth: "80%",
    fontFamily: "CormorantUnicaseBold",
  },
  qrContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    // Sombra del QR
    shadowColor: "#D98E32", // Sombra naranja sutil
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  // Esquinas decorativas del QR
  cornerTL: { position: 'absolute', top: 0, left: 0, width: 30, height: 30, borderTopWidth: 4, borderLeftWidth: 4, borderColor: '#D98E32', borderTopLeftRadius: 20 },
  cornerTR: { position: 'absolute', top: 0, right: 0, width: 30, height: 30, borderTopWidth: 4, borderRightWidth: 4, borderColor: '#D98E32', borderTopRightRadius: 20 },
  cornerBL: { position: 'absolute', bottom: 0, left: 0, width: 30, height: 30, borderBottomWidth: 4, borderLeftWidth: 4, borderColor: '#D98E32', borderBottomLeftRadius: 20 },
  cornerBR: { position: 'absolute', bottom: 0, right: 0, width: 30, height: 30, borderBottomWidth: 4, borderRightWidth: 4, borderColor: '#D98E32', borderBottomRightRadius: 20 },

  secureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ECFDF5",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 25,
  },
  secureText: {
    fontSize: 12,
    color: "#10B981",
    fontWeight: "700",
    marginLeft: 6,
  },

  // --- FOOTER ---
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  payButton: {
    backgroundColor: "#1a1a1a",
    flexDirection: 'row',
    height: 55,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: "#fff",
    fontFamily: "CormorantUnicaseBold",
    fontSize: 16,
    letterSpacing: 1,
  }
});