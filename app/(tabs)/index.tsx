import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import NewsCarrousel from '@/components/NewsCarrousel';
import React from 'react';
import TextoSeparador from '@/components/TextoSeparador';

export default function Home() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TextoSeparador /> 
      <NewsCarrousel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
