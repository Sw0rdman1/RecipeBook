import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Import environment variables from .env file

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiNSVs2ehjmzQn0b8d_VJlXEZWIUqBRkA",
  authDomain: "recipebook-mr.firebaseapp.com",
  projectId: "recipebook-mr",
  storageBucket: "recipebook-mr.appspot.com",
  messagingSenderId: "1089245404800",
  appId: "1:1089245404800:web:2d6359edad2e66b1175065",
};

// Initialize Firebase app
firebase.initializeApp(firebaseConfig);

// Firebase authentication
export const auth = firebase.auth();

// Firebase Firestore database
export const firestore = firebase.firestore();

// Firebase storage
export const storage = firebase.storage();
