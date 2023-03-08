// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGFSMECVOMVza8Y8GsIYzbWsGIoCXYrho",
  authDomain: "profile-e3675.firebaseapp.com",
  projectId: "profile-e3675",
  storageBucket: "profile-e3675.appspot.com",
  messagingSenderId: "178413123764",
  appId: "1:178413123764:web:18a9731b7f1d52f316bfe1",
  measurementId: "G-6H7094W0SK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authService = getAuth();
export const dbService = getFirestore();
export const storageService = getStorage();