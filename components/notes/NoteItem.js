import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NoteItem = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
      <View style={styles.circular}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#55BCF6",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: "#55bcf6",
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default NoteItem;
