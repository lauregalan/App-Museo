import * as LocalAuthentication from 'expo-local-authentication';
import { useAuth } from './useAuth';

async function authenticate() {

    let result  

    const {isAuthenticated} = useAuth(); 

    if(isAuthenticated){
        result = await LocalAuthentication.authenticateAsync({
            promptMessage: "Verificate",
            fallbackLabel: "Usar PIN",
            cancelLabel: "Cancelar",
        });

        if (result.success) {
            console.log("manteca");
        } else {
            console.log("Falló la autenticación");
        }

    }else{
        
        result =false 
    }

  return result
}
