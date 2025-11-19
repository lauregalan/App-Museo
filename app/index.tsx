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

export default function Login() {

  const {login, loading, error, isAuthenticated, logout} = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
  if (!loading && isAuthenticated) {
    {/* router.replace("/(tabs)"); */}
  }
  }, [loading, isAuthenticated]);

  const handleLogin = async () => {
    const res = await login(email, password)
    
    if(res){
      router.push("/(tabs)");
    }
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >

      <TextoBienvenida title="Iniciar sesión"/>
      <CampoTexto label="Correo Electronico" placeholder="ejemplo@correo.com" value={email} onChangeText={setEmail} secureTextEntry={false}/>
      <CampoTexto label="Contraseña "placeholder="********" value={password} onChangeText={setPassword} secureTextEntry={true}/>
      <BotonInicioSesion title="Iniciar sesión" onPress={handleLogin} />
      <NoRegistrado />
      {error && (
        <Text style={{ color: "red" }}>
          La cuenta no está registrada o la contraseña fue incorrecta
        </Text>
      )}    
  </View>
  );
}
