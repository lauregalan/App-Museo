import { View, Text, StyleSheet } from "react-native";

export default function SectionTitle() {
  return (
    <Text style={styles.sectionTitle}>Noticias</Text>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "black",
    paddingHorizontal: 30,
    paddingTop: 10,
    marginTop: 8,
    marginBottom: 0,
    letterSpacing: 1,
  },
});
