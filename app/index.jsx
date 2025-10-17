import { View } from 'react-native';
import BotonInicioSesion from '../components/BotonInicioSesion';
import CampoTexto from '../components/CampoTexto';
import Logo from '../components/Logo';
import TextoBienvenida from '../components/TextoBienvenida';
import NoRegistrado from '../components/NoRegistrado';


export default function Index() {
  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' }}>
      <Logo />
      <TextoBienvenida title="Iniciar sesión" />
      <CampoTexto placeholder="Correo electrónico"/> 
      <CampoTexto placeholder="Contraseña"/>
      <BotonInicioSesion title="Iniciar sesión"/>
      <NoRegistrado />
    </View>
  );
}
