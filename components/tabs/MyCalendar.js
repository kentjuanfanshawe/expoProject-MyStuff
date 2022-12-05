import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyCalendar = () => {
  return (
    <View style={styles.container}>
      <Text>My Calendar</Text>
    </View>
  );
};

export default MyCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
