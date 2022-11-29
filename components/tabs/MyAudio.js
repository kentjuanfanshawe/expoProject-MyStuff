import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyAudio = () => {
  return (
    <View style={styles.container}>
      <Text>My Audio</Text>
    </View>
  );
};

export default MyAudio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
