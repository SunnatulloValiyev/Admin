import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkgTZ1fa0Fe9d8azH8ALJyXFwYLSwhk9M",
  authDomain: "admin-s-d562e.firebaseapp.com",
  projectId: "admin-s-d562e",
  storageBucket: "admin-s-d562e.appspot.com", 
  messagingSenderId: "530548959529",
  appId: "1:530548959529:web:ef151d4387ac3769a4ef38"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);