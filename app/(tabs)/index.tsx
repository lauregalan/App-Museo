<<<<<<< HEAD
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/app/components/EditScreenInfo';
import { Text, View } from '@/app/components/Themed';
import NewsCarrousel from '@/comps/NewsCarrousel';
import React from 'react';
import TextoSeparador from '@/comps/TextoSeparador';
=======
import { StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
>>>>>>> origin/main

export default function Home() {
  return (
<<<<<<< HEAD
    <SafeAreaView style={styles.container} edges={['top']}>
      <TextoSeparador /> 
      <NewsCarrousel />
    </SafeAreaView>
=======
    <View style={styles.container}>
      <Text style={styles.title}>Inicio</Text>
    </View>
>>>>>>> origin/main
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
<<<<<<< HEAD
=======
    alignItems: "center",
    justifyContent: "center",
>>>>>>> origin/main
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
