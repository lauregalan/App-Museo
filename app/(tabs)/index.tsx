import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import TextoSeparador from '@/components/TextoSeparador';
import NewsCarrousel from '@/app/NewsCarrousel';
import { useNews } from '../hooks/useNews';

export default function Home() {
  const { data, isLoading, error } = useNews();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20, flex: 1 }}>
        <Text>Hubo un quilombo cargando la información del inicio.</Text>
      </View>
    );
  }

  if (!data) return null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <TextoSeparador />
      <NewsCarrousel data={data} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
