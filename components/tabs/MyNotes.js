import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

// components
import Header from "../texts/Header";
import NoteItem from "../notes/NoteItem";
import CircleButton from "../buttons/CircleButton";
import { ScrollView } from "react-native-gesture-handler";

const MyNotes = () => {
  return (
    <View style={styles.container}>
      <View style={styles.noteWrapper}>
        <View style={styles.headerWrapper}>
          <Header label="My Notes" style={styles.title} />
          <TouchableOpacity>
            <View style={styles.addWrapper}>
              <CircleButton name="add-outline" size={28} color={"#090c02"} />
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.items}>
            {/* Items */}
            <NoteItem text={"Note 1"} />
            <NoteItem text={"Note 2"} />
            <NoteItem text={"Note 3"} />
            <NoteItem text={"Note 4"} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default MyNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noteWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    justifyContent: "flex-start",
  },
  addWrapper: {
    justifyContent: "flex-end",
  },
  items: {
    marginTop: 20,
  },
});
