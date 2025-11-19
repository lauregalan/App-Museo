import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function three() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  // Función para navegar (para limpiar el JSX)
  const handleScanPress = () => {
     if (isPermissionGranted) {
        router.push("/QrEscaner");
     } else {
        requestPermission();
     }
  };

  return (
    <SafeAreaView style={styleSheet.container}>
      <StatusBar style="auto" />

      <Text style={styleSheet.mainText}>Expo QR Code Scanner</Text>
      <Text style={styleSheet.subText}>Toca la imagen para escanear</Text>

      <Pressable 
        onPress={handleScanPress}
        // Usamos una funcion para cambiar el estilo si esta presionado
        style={({ pressed }) => [
          styleSheet.imageBtn, 
          pressed && styleSheet.btnPressed // Si se presiona, aplica esto
        ]}
      >
        <Image
          source={require('../../assets/images/scanner.png')}
          style={styleSheet.imageIcon}
        />
      </Pressable>

    </SafeAreaView>
  );
}

const styleSheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', //gris muy claro
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  mainText: {
    fontSize: 24,
    fontWeight: 400,
    color: '#333',
    fontFamily: "CormorantUnicaseBold",

  },
  subText: {
    fontSize: 16,
    color: '#666',
    marginTop: -10,
    marginBottom: 10,
    fontFamily: "CormorantUnicaseBold",

  },
  
  imageBtn: {
    backgroundColor: 'white', 
    padding: 20,              
    borderRadius: 20,         
    borderWidth: 1,           
    borderColor: '#ddd',      
    
    // Sombra para iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    
    // Sombra para Android (Elevation)
    elevation: 10, 
  },
  
  // Estilo extra cuando el usuario toca el botón
  btnPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.96 }] // Efecto de "hundirse" un poco
  },

  // --- ESTILOS DE LA IMAGEN ---
  imageIcon: {
    width: 120,  // Ajusta el tamaño de la imagen
    height: 120,
    borderRadius: 10, 
  }
});