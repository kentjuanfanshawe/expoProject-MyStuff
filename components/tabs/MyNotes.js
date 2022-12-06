import { StyleSheet, Modal, View, Alert, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";

// components
import Header from "../texts/Header";
import NoteItem from "../notes/NoteItem";
import CircleButton from "../buttons/CircleButton";
import NoteModal from "../NoteModal";

const MyNotes = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const [noteItem, setNoteItem] = useState("");
  const [noteId, setNoteId] = useState("");
  const [notes, setNotes] = useState([]);
  const [dataExists, setDataExists] = useState(false);

  let userId = auth.currentUser?.uid;

  useEffect(() => {
    loadNoteList();
  }, []);

  const loadNoteList = async () => {
    const noteRef = query(
      collection(firestore, "users", userId, "notes"),
      where("userId", "==", userId)
    );

    try {
      const querySnapshot = await getDocs(noteRef);

      let noteArray = [];
      // Clear all data first before loading data from firebase
      setNotes("");
      querySnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        noteArray.push(item);
      });
      //   console.log(...noteArray);

      setNotes(noteArray);
    } catch (error) {
      console.log(error);
    }
  };

  const updateNote = async () => {
    let noteToSave = {
      text: noteItem,
      completed: false,
      userId: userId,
    };

    const docRef = firestore
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(noteId)
      .update(noteToSave, { merge: true });

    try {
      await docRef;

      // load new data
      loadNoteList();
      setModalVisible(!modalVisible);
      setNoteItem("");
    } catch (error) {
      console.log(error);
    }
  };

  const saveNote = async () => {
    let noteToSave = {
      text: noteItem,
      completed: false,
      userId: userId,
    };

    const docRef = firestore
      .collection("users")
      .doc(userId)
      .collection("notes")
      .add(noteToSave, { merge: true });

    try {
      await docRef;
      // copy generated document id for noteItem
      noteToSave.id = docRef.id;

      // load new data
      loadNoteList();
      setModalVisible(!modalVisible);
      setNoteItem("");
    } catch (err) {
      Alert.alert("Error in saving your note");
      console.log(err);
    }
  };

  const selectItem = (id, text) => {
    setNoteId(id);
    setNoteItem(text);
    setDataExists(true);

    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.noteWrapper}>
        <View style={styles.headerWrapper}>
          <Header label="My Notes" style={styles.title} />
          <View style={styles.addWrapper}>
            <CircleButton
              name="add-outline"
              size={28}
              color={"#090c02"}
              onPress={() => {
                setModalVisible(true);
                setDataExists(false);
                setNoteId("");
              }}
            />
          </View>
        </View>
        <View style={styles.items}>
          {/* Items */}
          <FlatList
            data={notes}
            renderItem={(data) => (
              <NoteItem
                id={data.item.id}
                text={data.item.text}
                onPress={() => selectItem(data.item.id, data.item.text)}
              />
            )}
          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <NoteModal
            id={noteId}
            onClose={() => {
              setModalVisible(!modalVisible);
              setNoteItem("");
            }}
            label={dataExists === true ? "Update Note" : "New Note"}
            textInputValue={noteItem}
            onChangeText={(text) => setNoteItem(text)}
            onSave={saveNote}
            onUpdate={updateNote}
            onDelete={() => alert("delete")}
            isExists={dataExists}
          />
        </Modal>
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
