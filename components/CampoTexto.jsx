import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native"; 

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const INPUT_WIDTH = SCREEN_WIDTH * 0.85; 


export default function CampoTexto(props) {
  return (
    <TextInput 
      style={styles.input}
      placeholder={props.placeholder}    
      placeholderTextColor="#999"      
    />
  );
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: INPUT_WIDTH, 
    borderRadius: 15,
    borderColor: "#ccc",
  },
});