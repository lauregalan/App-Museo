import * as LocalAuthentication from 'expo-local-authentication';
import { Alert } from 'react-native';

export function useBiometricAuth() {

  const authenticate = async (): Promise<boolean> => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      if (!compatible) {
        Alert.alert('Tu dispositivo no tiene biometría');
        return false;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert('No tenés huella o cara registrada');
        return false;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Verificate para comprar tickets',
        fallbackLabel: 'Usar PIN',
        cancelLabel: 'Cancelar',
      });

      if (result.success) {
        return true;
      } else {
        Alert.alert('No se pudo verificar tu identidad');
        return false;
      }

    } catch (error) {
      console.log('Error biométrico:', error);
      Alert.alert('Ocurrió un error en la verificación');
      return false;
    }
  };

  return { authenticate };
}
