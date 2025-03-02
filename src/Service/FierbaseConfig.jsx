// Import the functions you need from the SDKs you need


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Import the functions you need from the SDKs you need


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4BmIPjVKTe1-aA5wcHMiJ-FN6NNpLfM4",
  authDomain: "trip-planer-672c6.firebaseapp.com",
  projectId: "trip-planer-672c6",
  storageBucket: "trip-planer-672c6.firebasestorage.app",
  messagingSenderId: "290405763849",
  appId: "1:290405763849:web:d03b40485d757b33b221d8",
  measurementId: "G-PT0QH87P8R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);