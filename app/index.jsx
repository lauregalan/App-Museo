import { View } from 'react-native';
import BotonInicioSesion from '../components/BotonInicioSesion';
import CampoTexto from '../components/CampoTexto';
import Logo from '../components/Logo';
import TextoBienvenida from '../components/TextoBienvenida';
import NoRegistrado from '../components/NoRegistrado';
import { supabase } from '../lib/supabase';
import React from 'react';
export default function Index() {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState(''); 

    const handleInicioSesion = async () => {
  
      console.log("handleSESION nashe ejecutado"); 
  
      try {
  
        const { data, error: loginError } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
  
        if (loginError) {
          console.log("Error al inciar usuario:", loginError.message);
          return;
        }
  
        if (loginError) { throw loginError;} 
  

      } catch (err) {
        console.error(err);
      }
    };
  

  return (
    <View style={{ flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#fff' }}>
      <Logo />
      <TextoBienvenida title="Iniciar sesión" />
      <CampoTexto placeholder="Correo electrónico" value={email} onChangeText={setEmail} />
      <CampoTexto placeholder="Contraseña" value={password} onChangeText={setPassword} />
      <BotonInicioSesion title="Iniciar sesión" onPress={handleInicioSesion}/>
      <NoRegistrado />
    </View>
  );
}
