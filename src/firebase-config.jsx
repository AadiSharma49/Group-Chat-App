// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfN26QzAD0J7V5LhzjcWO9gg7TuFGyg5k",
  authDomain: "groupchat-89a27.firebaseapp.com",
  projectId: "groupchat-89a27",
  storageBucket: "groupchat-89a27.appspot.com",
  messagingSenderId: "642792033072",
  appId: "1:642792033072:web:6a4b289c5d1add49bcd6f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider= new GoogleAuthProvider();
export const db = getFirestore(app);