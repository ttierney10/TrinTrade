import firebase from "firebase";
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyBYbMCU79RTb3tqo29BvlBwU_q7xA7zt1k",
  authDomain: "trintrade-draft.firebaseapp.com",
  databaseURL: "",
  projectId: "trintrade-draft",
  storageBucket: "trintrade-draft.appspot.com",
  messagingSenderId: "84514196580",
  appId: "1:84514196580:web:ea448de7343b1dd940a371"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

export const auth = firebase.auth()
export const firestore = firebase.firestore
export const storage = firebase.storage()
export default db;