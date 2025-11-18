import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import Colors from "@/constants/Colors";

// Tu componente de ícono (no se toca)
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,

        headerShown: false,

        tabBarStyle: {
          position: 'absolute', // Clave para que flote
          bottom: 25,           // Distancia desde abajo
          left: 20,             // Distancia izquierda
          right: 20,            // Distancia derecha
          
          height: 60,           // Altura
          borderRadius: 10,     // Esquinas redondeadas
          
          // Usa el color de fondo de tu tema
          backgroundColor: Colors[colorScheme ?? 'light'].background, 
          
          // Sombra (iOS)
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          // Sombra (Android)
          elevation: 5,
        },
      }}
    >
      {/*<Tabs.Screen
        name="news"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          
 
          headerRight: () => (

              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
          ),
        }}
      />*/}

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />, 
        }}
      />

      <Tabs.Screen
        name="fossils"
        options={{
          title: "Fósiles",
          tabBarIcon: ({ color }) => <TabBarIcon name="paw" color={color} />,
        }}
      />

      <Tabs.Screen
        name="three"
        options={{
          title: "Scann",
          tabBarIcon: ({ color }) => <TabBarIcon name="qrcode" color={color} />,
        }}
      />

      {/*<Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />*/}
    </Tabs>
  );
}
