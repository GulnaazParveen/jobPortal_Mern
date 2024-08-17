// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 import {getAuth,GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBWBO8bX-K6AAqcR2kLfsyyi5hTHmmCA1U",
  authDomain: "jobportal-27390.firebaseapp.com",
  projectId: "jobportal-27390",
  storageBucket: "jobportal-27390.appspot.com",
  messagingSenderId: "261007216322",
  appId: "1:261007216322:web:70cad2a3beb66a0f87755b",
  measurementId: "G-EFXZL20NBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth()
const provider= new GoogleAuthProvider()
export {auth,provider}
