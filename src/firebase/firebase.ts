// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNWhCFIp8Izqehlkj1tLhMadq_RjrNSkM",
  authDomain: "sushi-counter-853d9.firebaseapp.com",
  projectId: "sushi-counter-853d9",
  storageBucket: "sushi-counter-853d9.appspot.com",
  messagingSenderId: "782435254384",
  appId: "1:782435254384:web:385e684168c854e11bf4b5",
  measurementId: "G-W5Z6K913FG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
