import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6D4IAoeWbNI9nrznQU4p5Q3nx4AtxWGo",
  authDomain: "themoviedb-27887.firebaseapp.com",
  projectId: "themoviedb-27887",
  storageBucket: "themoviedb-27887.appspot.com",
  messagingSenderId: "83293865290",
  appId: "1:83293865290:web:778f0727b6fe89829dadb3",
  measurementId: "G-V4QEG4C2Z8",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
