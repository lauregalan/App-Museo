import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/app/components/EditScreenInfo';
import { Text, View } from '@/app/components/Themed';
import NewsCarrousel from '@/comps/NewsCarrousel';
import React from 'react';
import TextoSeparador from '@/comps/TextoSeparador';

export default function TabOneScreen() {
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
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
