import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import Logo from "../components/Logo";
import TextoBienvenida from "../components/TextoBienvenida";
import CampoTexto from "../components/CampoTexto";
import BotonInicioSesion from "../components/BotonInicioSesion";
import { supabase } from "../lib/supabase";

export default function PantallaRegistro() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [nombre, setNombre] = React.useState('');

  const handleRegistro = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{ email, password, name: nombre }]);

      if (error) {
        console.log('Error al registrar el usuario:', error);
      } else {
        console.log('Usuario registrado:', data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <TextoBienvenida title="Crear cuenta" />

      <CampoTexto placeholder="Nombre" value={nombre} onChangeText={setNombre} />
      <CampoTexto placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <CampoTexto placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <CampoTexto placeholder="Confirmar contraseña"/>
      
      <BotonInicioSesion title="Registrarse" onPress={handleRegistro} />
      
      <View style={styles.footer}>
        <Text style={styles.text}>¿Ya tenés cuenta?</Text>
        <Link href="/index" asChild>
          <Text style={styles.link}> Iniciá sesión</Text>
        </Link>
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
