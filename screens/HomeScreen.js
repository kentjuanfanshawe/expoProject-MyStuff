import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { auth, firestore } from "../firebase";

// import components
import MyNotes from "../components/tabs/MyNotes";
import MyAudio from "../components/tabs/MyAudio";
import MyProfile from "../components/tabs/MyProfile";

const HomeScreen = () => {
  const Tab = createBottomTabNavigator();

  return (
    // <View style={styles.container}>
    //   <Text>Email: {auth.currentUser?.email}</Text>
    //   <TouchableOpacity style={styles.button} onPress={HandleSignOut}>
    //     <Text style={styles.buttonText}>Sign Out</Text>
    //   </TouchableOpacity>
    // </View>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "My Notes") {
            iconName = focused ? "document" : "document-outline";
          } else if (route.name === "My Audio") {
            iconName = focused ? "musical-notes" : "musical-notes-outline";
          } else if (route.name === "My Profile") {
            iconName = focused ? "person-circle" : "person-circle-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0782F9",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="My Notes" component={MyNotes} />
      <Tab.Screen name="My Audio" component={MyAudio} />
      <Tab.Screen name="My Profile" component={MyProfile} />
    </Tab.Navigator>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});
