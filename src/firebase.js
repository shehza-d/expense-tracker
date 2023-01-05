import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
  deleteDoc,
  updateDoc,
  limit,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCVZnu1Dgishw2o2eu_W0Al8tv25CTEYQI",
  authDomain: "expense-tracker-4989b.firebaseapp.com",
  projectId: "expense-tracker-4989b",
  storageBucket: "expense-tracker-4989b.appspot.com",
  messagingSenderId: "17893173019",
  appId: "1:17893173019:web:29b3908b3ec4f99c4a15be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
