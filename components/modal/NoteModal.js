import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

// components
import Header from "../texts/Header";
import Button from "../buttons/Button";

const NoteModal = ({
  label,
  onClose,
  textInputValue,
  onChangeText,
  onSave,
  onUpdate,
  onDelete,
  isExists,
}) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        {/* Modal Header */}
        <View style={styles.modalHeader}>
          <Header label={label} style={styles.title} />
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close-outline" size={28} color={"#090c02"} />
          </TouchableOpacity>
        </View>
        {/* Modal Body */}
        <TextInput
          placeholder="Add a note here"
          style={styles.input}
          multiline
          numberOfLines={4}
          value={textInputValue}
          onChangeText={onChangeText}
        />
        {/* Modal Footer */}

        {!isExists && (
          <View style={styles.buttonWrapper}>
            <Button label="Save" width={"40%"} onPress={onSave} />
          </View>
        )}
        {isExists && (
          <View style={styles.buttonWrapper}>
            <Button label="Update" width={"40%"} onPress={onUpdate} />
            <TouchableOpacity style={styles.button} onPress={onDelete}>
              <Ionicons name="trash" size={24} color={"#fff"} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default NoteModal;

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 35,
    shadowColor: "#090c02",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "40%",
    marginVertical: 5,
    backgroundColor: "#e34439",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
