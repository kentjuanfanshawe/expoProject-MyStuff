import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

const Button = ({ label, onPress, width, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ style }, styles.button, { width: width }]}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    marginVertical: 5,
    backgroundColor: "#0782F9",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
