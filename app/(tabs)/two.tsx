import { View, Text, ActivityIndicator } from "react-native";
import { useFossils } from "../hooks/useFossils";
import FossilsList from "@/components/FossilesList";

export default function FossilsScreen() {
  
  const { data, isLoading, error } = useFossils();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20, flex: 1}}>
        <Text>Hubo un problema cargando los fósiles.</Text>
      </View>
    );
  }
  if (!data) return null;

  return <FossilsList data={data} />;
}
