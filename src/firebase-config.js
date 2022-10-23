// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs3Juh0Kn-cmRKIc4iKwZqhejfOj88OSQ",
  authDomain: "blogproject-new.firebaseapp.com",
  projectId: "blogproject-new",
  storageBucket: "blogproject-new.appspot.com",
  messagingSenderId: "459706266841",
  appId: "1:459706266841:web:e682371fa94de8edd2bac8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// for connecting with firestore database 
export const db = getFirestore(app);

// for authentication 
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

