import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGklLImZn_LHbCd4CX4iRDOM7kyJAWvuY",
  authDomain: "social-media-24da8.firebaseapp.com",
  projectId: "social-media-24da8",
  storageBucket: "social-media-24da8.appspot.com",
  messagingSenderId: "779544379937",
  appId: "1:779544379937:web:58d3a30c6ea2bbd836d960",
  measurementId: "G-5FX8SPXRXL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
