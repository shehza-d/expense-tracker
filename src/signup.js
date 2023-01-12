import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  doc,
  serverTimestamp,
  setDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"; //CDN
import { db } from "./firebase.js";
//sendEmailVerification,

const createUserFun = async (userEmail, userPassword, userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    await updateProfile(auth.currentUser, { displayName: userName });
    const uid = userCredential.user.uid;
    await setDoc(doc(db, uid, "cash"), {
      amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });

    await setDoc(doc(db, uid, "saving"), {
      amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });
    await setDoc(doc(db, uid, "bank"), {
      amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });
    await setDoc(doc(db, uid, "other"), {
      amount: 0,
      createdOn: serverTimestamp(),
    });
    await setDoc(doc(db, uid, "transactionsHistory"), {
      // userName: user.displayName,
      // amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });

    // await createDefaultAccFun(userCredential.user.uid);
    userAuthState();
  } catch (err) {
    console.log(err);
    alert(err.code);
  }
};

const userAuthState = () => {
  //redirect user based on auth state
  onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = `./dashboard.html`;
    else console.log("User is signed out");
  });
};
// userAuthState(); //this is not working

document.querySelector("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const userEmail = document.querySelector("#signupUserEmail").value;
  const userPassword = document.querySelector("#signupUserPassword").value;
  const userName = document.querySelector("#signupUserName").value;

  createUserFun(userEmail, userPassword, userName);
});

const createDefaultAccFun = async (uid) => {
  try {
    await setDoc(doc(db, uid, "cash"), {
      amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });

    await setDoc(doc(db, uid, "saving"), {
      amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });

    await setDoc(doc(db, uid, "transactionsHistory"), {
      // userName: user.displayName,
      // amount: 0,
      category: "default",
      createdOn: serverTimestamp(),
    });

    // await addDoc(collection(db, user.uid), {dataObj });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
