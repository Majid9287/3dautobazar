// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAUFsDnFqnN1EWUmUCWnf7m9hB-n5UetFI",
    authDomain: "https://console.firebase.google.com/project/dautobazaar/database/dautobazaar-default-rtdb/data/~2F",
    projectId: "dautobazaar",
    storageBucket: "https://console.firebase.google.com/project/dautobazaar/storage/dautobazaar.appspot.com/files",
    messagingSenderId: "734558661333",
    appId: "1:734558661333:android:07a3139c3d6cf2b38b505c"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
