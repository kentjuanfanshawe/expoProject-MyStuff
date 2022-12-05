import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Header = ({ label, style }) => {
  return (
    <View>
      <Text style={[style, styles.title]}>{label}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#090c02",
  },
});
