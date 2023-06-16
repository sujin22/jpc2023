// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqySE0HW9p1F5MpNME44tn7qPIDqc4BNk",
  authDomain: "jpc2023-655f5.firebaseapp.com",
  projectId: "jpc2023-655f5",
  storageBucket: "jpc2023-655f5.appspot.com",
  messagingSenderId: "229390947684",
  appId: "1:229390947684:web:f994c3b3c94cf4deb5d671",
  measurementId: "G-MP139WXRGD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);