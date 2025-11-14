import { router } from 'expo-router';
import { View } from 'react-native';
import BotonInicioSesion from '../comps/BotonInicioSesion';
import CampoTexto from '../comps/CampoTexto';
import Logo from '../comps/Logo';
import NoRegistrado from '../comps/NoRegistrado';
import TextoBienvenida from '../comps/TextoBienvenida';

export default function Index() {
  const irRegistro = ()=> {
    router.push("/PantallaRegistro")
  }
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' }}>
      <Logo />
      <TextoBienvenida title="Iniciar sesión" />
      <CampoTexto placeholder="Correo electrónico" />
      <CampoTexto placeholder="Contraseña" />
      <BotonInicioSesion title="Iniciar sesión" onPress={irRegistro} />
      <NoRegistrado />
    </View>
  );
}
