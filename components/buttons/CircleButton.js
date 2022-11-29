import { View, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const CircleButton = ({ name, onPress, size, color }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.circleShadow}>
      <View style={styles.circleContainer}>
        <Ionicons name={name} size={size} color={color} />
      </View>
    </TouchableOpacity>
  );
};

export default CircleButton;

const styles = StyleSheet.create({
  circleContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  circleShadow: {
    borderRadius: 30,
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
