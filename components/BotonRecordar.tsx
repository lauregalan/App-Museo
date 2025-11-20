import { Pressable, View, Text } from "react-native";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useAuth } from "@/app/hooks/useAuth";

export default function RecordarmeButton() {
  const { remembering, isRemember } = useAuth(); 
  
  const colors = useThemeColor();

  const handlePress = () => {
    remembering(!isRemember); // acá le mandás el nuevo valor
  };

  return (
    <Pressable 
      onPress={handlePress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20
      }}
    >
      <View
        style={{
          width: 22,
          height: 22,
          borderWidth: 2,
          borderColor: colors.text,
          marginRight: 10,
          backgroundColor: isRemember ? colors.text : "transparent"
        }}
      />
      <Text style={{ color: colors.text }}>Recordarme</Text>
    </Pressable>
  );
}


