import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, firestore, storage } from "../../firebase";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

// components
import Button from "../buttons/Button";
import Header from "../texts/Header";
import ImageViewer from "../images/ImageViewer";

const PlaceholderImage = require("../../assets/blank-profile.png");

const MyProfile = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFromStorage, setImageFromStorage] = useState(null);
  const [hasUserProfile, setHasUserProfile] = useState(false);

  let userId = auth.currentUser?.uid;

  useEffect(() => {
    loadProfile();
  }, []);

  const navigation = useNavigation();

  const nameHandler = (value) => {
    setName(value);
  };

  const ageHandler = (value) => {
    setAge(value);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
        console.log("User logged out");
      })
      .catch((error) => alert(error.message));
  };

  const promptSignOut = () => {
    Alert.alert("Sign Out", "Would you like to sign out?", [
      {
        text: "Okay",
        onPress: handleSignOut,
      },
      {
        text: "Cancel",
        onPress: () => console.log("Sign out cancelled"),
        style: "cancel",
      },
    ]);
  };

  const saveProfile = async () => {
    const imageUrl = await uploadImageChecker();

    // Save data to Firestore
    firestore
      .collection("users")
      .doc(userId)
      .set({
        name: name,
        age: parseInt(age),
        image: imageUrl,
        birthdate: date.toDateString(),
      })
      .then(() => {
        Alert.alert("Profile saved!");
        loadProfile();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error saving profile");
      });
  };

  const updateProfile = async () => {
    const imageUrl = await uploadImageChecker();

    // Save data to Firestore
    firestore
      .collection("users")
      .doc(userId)
      .update({
        name: name,
        age: parseInt(age),
        image: imageUrl,
        birthdate: date.toDateString(),
      })
      .then(() => {
        Alert.alert("Profile updated!");
        console.log("Profile updated!");
        loadProfile();
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error saving profile");
      });
  };

  const loadProfile = () => {
    firestore
      .collection("users")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setHasUserProfile(true);
          setName(doc.data().name);
          setAge(doc.data().age.toString());
          setSelectedImage(doc.data().image);
          setImageFromStorage(doc.data().image);
          setDate(new Date(doc.data().birthdate));
        } else {
          // doc.data() will be undefined in this case
          setHasUserProfile(false);
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result.assets[0].uri, selectedImage);
    } else {
      Alert.alert("You did not select any image");
      console.log(selectedImage);
    }
  };

  const imageChecker = async () => {
    if (!selectedImage) {
      pickImage();
    } else {
      Alert.alert("Set Photo", "Do you want to change your profile picture?", [
        { text: "Okay", onPress: pickImage },
        {
          text: "Cancel",
          onPress: () => console.log("Pressed cancel"),
          style: "cancel",
        },
      ]);
    }
  };

  const uploadImageChecker = async () => {
    if (selectedImage === imageFromStorage) return imageFromStorage;

    return await uploadImage();
  };

  const uploadImage = async () => {
    let uri = selectedImage;

    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    const response = await fetch(uploadUri);
    const blob = await response.blob();

    let fileName = uri.split("/").pop();
    const extension = fileName.split(".").pop();
    const name = fileName.split(".").slice(0, -1).join(".");

    fileName = name + "." + extension;

    const storageRef = storage.ref(`photos/${fileName}`);
    const task = storageRef.put(blob);

    try {
      await task;
      return await storageRef.getDownloadURL();
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header label="My Profile" style={styles.title} />
      <ImageViewer
        placeholderImageSource={PlaceholderImage}
        selectedImage={selectedImage}
        onPress={imageChecker}
      />
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        onChangeText={nameHandler}
        value={name}
        placeholder="name"
      />
      <Text>Age</Text>
      <TextInput
        style={styles.input}
        onChangeText={ageHandler}
        value={age}
        placeholder="age"
      />
      <Text>Birthday</Text>
      <TouchableOpacity onPress={() => setShow(true)}>
        <Text style={styles.input}>{date.toDateString()}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          onChange={onChangeDate}
          minimumDate={new Date(1950, 12, 31)}
          maximumDate={new Date(2004, 0, 1)}
        />
      )}
      {!hasUserProfile && (
        <Button onPress={saveProfile} label="Save" width={"50%"} />
      )}
      {hasUserProfile && (
        <Button onPress={updateProfile} label="Update" width={"50%"} />
      )}
      <Button onPress={promptSignOut} label="Sign Out" width={"50%"} />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ddd",
  },
  add: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  title: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  input: {
    width: "60%",
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 10,
    textAlign: "center",
  },
});
