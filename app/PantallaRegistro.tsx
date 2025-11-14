import { router } from 'expo-router';
import { StyleSheet, Text, View } from "react-native";
import BotonInicioSesion from "../comps/BotonInicioSesion";
import CampoTexto from "../comps/CampoTexto";
import Logo from "../comps/Logo";
import TextoBienvenida from "../comps/TextoBienvenida";

export default function PantallaRegistro() {
  const irInicio = () => {
    router.push("/(tabs)")
  }
  return (
    <View style={styles.container}>

      <Logo />

      <TextoBienvenida title="Crear cuenta" />

      <CampoTexto placeholder="Nombre"  />
      <CampoTexto placeholder="Correo electrónico"  />
      <CampoTexto placeholder="Contraseña" />
      <CampoTexto placeholder="Confirmar contraseña"/>
      
      <BotonInicioSesion title="Registrarse" onPress={irInicio}/>
      
      <View style={styles.footer}>
        <Text style={styles.text}>¿Ya tenés cuenta?</Text>
      </View>
      
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  text: {
    color: "#666",
    fontSize: 14,
  },
  link: {
    color: "#b99b55ff",
    fontWeight: "bold",
  },
});
