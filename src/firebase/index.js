import { firebase } from "@firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyDEyEWaXZKLAoSjRIPeyukO6iBU9OTvNE8",
  authDomain: "task-manager-843ac.firebaseapp.com",
  databaseURL: "https://task-manager-843ac.firebaseio.com",
  projectId: "task-manager-843ac",
  storageBucket: "task-manager-843ac.appspot.com",
  messagingSenderId: "512701812972",
  appId: "1:512701812972:web:809e753e49178843cb55c9",
  measurementId: "G-9G2J986H6Q",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase;