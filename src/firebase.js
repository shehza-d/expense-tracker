// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVZnu1Dgishw2o2eu_W0Al8tv25CTEYQI",
  authDomain: "expense-tracker-4989b.firebaseapp.com",
  projectId: "expense-tracker-4989b",
  storageBucket: "expense-tracker-4989b.appspot.com",
  messagingSenderId: "17893173019",
  appId: "1:17893173019:web:29b3908b3ec4f99c4a15be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;