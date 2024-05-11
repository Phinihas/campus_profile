import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
  apiKey: "AIzaSyBAWnSG5wv-EebyZ5-5R4LE8O2FlhQM3iQ",
  authDomain: "campus-profile.firebaseapp.com",
  projectId: "campus-profile",
  storageBucket: "campus-profile.appspot.com",
  messagingSenderId: "523653735911",
  appId: "1:523653735911:web:0a98120fa7da1c7ae44942"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const googleProvider=new GoogleAuthProvider(app)
export const database= getFirestore(app)