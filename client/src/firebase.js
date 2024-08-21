import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyChA8UYR3I4GX2lPrFtrIHlZshQyCNyK3E",
  authDomain: "video-cb560.firebaseapp.com",
  projectId: "video-cb560",
  storageBucket: "video-cb560.appspot.com",
  messagingSenderId: "752893148188",
  appId: "1:752893148188:web:645ec32419d8dfe8fc73d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const provider = new GoogleAuthProvider()

export default app