import { router } from "expo-router";
import { View } from "react-native";
import BotonInicioSesion from "../components/BotonInicioSesion";
import CampoTexto from "../components/CampoTexto";
import Logo from "../components/Logo";
import NoRegistrado from "../components/NoRegistrado";
import TextoBienvenida from "../components/TextoBienvenida";
import { useAuth } from "./hooks/useAuth";
import { useState, useEffect } from "react";
import { Text } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import * as Location from "expo-location";

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();

  if (foregroundStatus !== 'granted' || backgroundStatus !== 'granted') {
    alert('No se pudieron obtener los permisos de ubicación');
    return false;
  }
  return true;
};

export default function Login() {

  const {login, loading, error, isAuthenticated, logout} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const colors = useThemeColor();


  useEffect(() => {

    if (!loading && isAuthenticated) {
      router.replace("/(tabs)"); // redirige a la pantalla principal
    } 
    
  }, [loading, isAuthenticated]);

  const handleLogin = async () => {
    
    const res = await login(email, password)
    
    if(res){
      router.push("/(tabs)");
    }
  }


  const handleInvitado = () => {
    router.push("/(tabs)");
    
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.background,
      }}
    >

      <TextoBienvenida title="Iniciar sesión"/>
      <CampoTexto label="Correo Electronico" placeholder="ejemplo@correo.com" value={email} onChangeText={setEmail} secureTextEntry={false}/>
      <CampoTexto label="Contraseña "placeholder="********" value={password} onChangeText={setPassword} secureTextEntry={true}/>
      <BotonInicioSesion title="Iniciar sesión" onPress={handleLogin} />
      <BotonInicioSesion title="Iniciar como invitado" onPress={handleInvitado} />

      <NoRegistrado />
      {error && (
        <Text style={{ color: "red" }}>
          La cuenta no está registrada o la contraseña fue incorrecta
        </Text>
      )}    
  </View>
  );
}
