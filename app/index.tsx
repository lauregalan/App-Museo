import { router } from "expo-router";
import { View } from "react-native";
import BotonInicioSesion from "../components/BotonInicioSesion";
import CampoTexto from "../components/CampoTexto";
import Logo from "../components/Logo";
import NoRegistrado from "../components/NoRegistrado";
import TextoBienvenida from "../components/TextoBienvenida";

export default function Login() {
  const irRegistro = () => {
    router.push("/register");
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
      }}
    >
      <Logo />
      <TextoBienvenida title="Iniciar sesión" />
      <CampoTexto placeholder="Correo electrónico" />
      <CampoTexto placeholder="Contraseña" />
      <BotonInicioSesion title="Iniciar sesión" onPress={irRegistro} />
      <NoRegistrado />
    </View>
  );
}
