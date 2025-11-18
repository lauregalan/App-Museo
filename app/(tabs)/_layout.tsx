import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import React from 'react';
import { Pressable } from 'react-native';

import { useColorScheme } from '@/app/components/useColorScheme';
import Colors from '@/constants/Colors';

// Tu componente de ícono (no se toca)
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
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
        // --- FIN DEL ESTILO AÑADIDO ---
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          
 
          headerRight: () => (
            <Link href="/modal" asChild>
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
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Exhibiciones',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="three"
        options={{
          title: 'Noticias',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />


      <Tabs.Screen
        name="four"
        options={{
          title: 'Exhibiciones',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}