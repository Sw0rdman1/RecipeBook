import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Import environment variables from .env file

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3dCdz1z4gLwcpwbR14gmBQegOazbDTSk",
  authDomain: "recipebook-2535b.firebaseapp.com",
  projectId: "recipebook-2535b",
  storageBucket: "recipebook-2535b.appspot.com",
  messagingSenderId: "1081383699938",
  appId: "1:1081383699938:web:1c4c6d146e34aa7d35a5bb",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Firebase authentication
export const auth = firebase.auth();

// Firebase Firestore database
export const firestore = firebase.firestore();

// Firebase storage
export const storage = firebase.storage();

export default firebase;
