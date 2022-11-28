// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsrAXaFMi0UimCJEcueDKWpSCoRmDpNlU",
  authDomain: "mystuff-c6700.firebaseapp.com",
  projectId: "mystuff-c6700",
  storageBucket: "mystuff-c6700.appspot.com",
  messagingSenderId: "437160969766",
  appId: "1:437160969766:web:ef39f23dafc436580fc8e7",
};

// Initialize Firebase
let app;
if (!firebase.apps.lengt) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app(); // if already initialized, use that one
}

const auth = app.auth();

export { auth };
