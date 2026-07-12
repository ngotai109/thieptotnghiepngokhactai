// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHvemOmhqsuGGD_uj-loV_y00h4aagbds",
  authDomain: "thiep-tot--nghiep.firebaseapp.com",
  projectId: "thiep-tot--nghiep",
  storageBucket: "thiep-tot--nghiep.firebasestorage.app",
  messagingSenderId: "798169730165",
  appId: "1:798169730165:web:70fbe26ed982f0dea37c3c",
  measurementId: "G-JJ69L32G6L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);
