import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useColorScheme } from "@/hooks/useColorScheme";
export { ErrorBoundary } from "expo-router";
import {OneSignal, LogLevel} from 'react-native-onesignal';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    CormorantUnicaseBold: require('../assets/fonts/CormorantUnicase-Bold.ttf'),
    CormorantUnicaseSemiBold: require('../assets/fonts/CormorantUnicase-SemiBold.ttf'),
    CormorantUnicaseMedium: require('../assets/fonts/CormorantUnicase-Medium.ttf'),
    CormorantUnicaseLight: require('../assets/fonts/CormorantUnicase-Light.ttf'),
    CormorantUnicaseRegular: require('../assets/fonts/CormorantUnicase-Regular.ttf'),
    //Montserrat: require('../assets/fonts/Montserrat-Variable.woff2'), si se necesita hay que descargar la version ttf
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

    // Enable verbose logging for debugging (remove in production)
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  // Initialize with your OneSignal App ID
  OneSignal.initialize('2c37e609-30dd-455e-a500-83d0219cfd83');
  // Use this method to prompt for push notifications.
  // We recommend removing this method after testing and instead use In-App Messages to prompt for notification permission.
  OneSignal.Notifications.requestPermission(false);
  return (
  <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="PantallaRegistro" options={{ title: "Registro" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
          <Stack.Screen name="QrEscaner"/>
        </Stack>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
