import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import BotonInicioSesion from "../components/BotonInicioSesion";
import CampoTexto from "../components/CampoTexto";
import Logo from "../components/Logo";
import TextoBienvenida from "../components/TextoBienvenida";
import { useRegister } from "./hooks/useRegister";
import { useState } from "react";

export default function Register() {

  const {register, loading, error} = useRegister(); 

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const irInicio = () => {
    router.push("/(tabs)");
  };

  const handleRegister = async () =>{
    const res = await register(email, password)
    
    if(res){
      router.push("/(tabs)");
    }
  }

  return (
    <View style={styles.container}>
      <Logo />

      <TextoBienvenida title="Crear cuenta" />

      <CampoTexto placeholder="Correo electrónico" value={email} onChangeText={setEmail}/>
      <CampoTexto placeholder="Contraseña" value={password} onChangeText={setPassword}/>

      <CampoTexto placeholder="Confirmar contraseña" />

      <BotonInicioSesion title="Registrarse" onPress={handleRegister} />

      <View style={styles.footer}>
        <Text style={styles.text}>¿Ya tenés cuenta?</Text>
      </View>

      {error && (
        <Text style={{ color: "red" }}>
          No se pudo completar el registro
        </Text>
      )}  
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
