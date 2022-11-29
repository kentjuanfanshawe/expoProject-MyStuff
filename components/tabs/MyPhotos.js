import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyPhotos = () => {
  return (
    <View style={styles.container}>
      <Text>My Photos</Text>
    </View>
  );
};

export default MyPhotos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
