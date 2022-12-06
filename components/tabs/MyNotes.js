import { StyleSheet, Modal, View, Alert, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { auth, firestore } from "../../firebase";
import { query, where, collection, getDocs } from "firebase/firestore";

///// EXPO API USED
import * as SMS from "expo-sms";
import * as MailComposer from "expo-mail-composer";

// components
import Header from "../texts/Header";
import NoteItem from "../notes/NoteItem";
import CircleButton from "../buttons/CircleButton";
import NoteModal from "../NoteModal";

const MyNotes = () => {
  const [modalVisible, setModalVisible] = useState(false);
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
      // Clear data before loading from firebase
      setNotes("");
      querySnapshot.forEach((doc) => {
        let item = doc.data();
        item.id = doc.id;
        noteArray.push(item);
      });

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

  const deleteNote = async () => {
    const docRef = firestore
      .collection("users")
      .doc(userId)
      .collection("notes")
      .doc(noteId);

    try {
      await docRef.delete();
      console.log("deleted");

      // load new data
      loadNoteList();
      setModalVisible(!modalVisible);
      setNoteId("");
      setNoteItem("");
    } catch (error) {
      console.log(error);
    }
  };

  const selectItem = (id, text) => {
    setNoteId(id);
    setNoteItem(text);
    setDataExists(true);

    setModalVisible(true);
  };

  const promptDelete = () => {
    Alert.alert("Delete note", "Do you want to delete this note?", [
      {
        text: "Okay",
        onPress: deleteNote,
      },
      {
        text: "Cancel",
        onPress: () => console.log("Delete Cancelled"),
        style: "cancel",
      },
    ]);
  };

  // FOR LONG PRESS FEATURE - SHARE NOTE TO SEND AS SMS OR EMAIL
  const shareNote = (id, text) => {
    setNoteId(id);
    setNoteItem(text);
    setDataExists(true);

    Alert.alert(
      "Share Note",
      "How do you want to share it?",
      [
        {
          text: "SMS",
          onPress: sendSMS,
        },
        {
          text: "Email",
          onPress: sendEmail,
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const sendSMS = async () => {
    const isAvailable = SMS.isAvailableAsync();
    let message = `Here's a note sent from MyStuff:\n\n ${noteItem}`;

    try {
      await isAvailable;
      if (isAvailable) {
        const { result } = await SMS.sendSMSAsync([""], message);

        if (result === "sent") {
          Alert.alert("Your text has been sent!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sendEmail = async () => {
    const isAvailable = MailComposer.isAvailableAsync();
    let options = {
      subject: "A note has been shared from MyStuff",
      body: `Here's a note sent to you:\n\n${noteItem}`,
    };

    const compose = MailComposer.composeAsync(options);

    try {
      await isAvailable;
      if (isAvailable) {
        const result = await compose;
        if (result.status === "sent") {
          Alert.alert("Your email has been sent successfully");
        }
      }
    } catch (error) {
      console.log(error);
    }
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
                onLongPress={() => shareNote(data.item.id, data.item.text)}
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
            label={dataExists === true ? "Edit Note" : "New Note"}
            textInputValue={noteItem}
            onChangeText={(text) => setNoteItem(text)}
            onSave={saveNote}
            onUpdate={updateNote}
            onDelete={promptDelete}
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
});
