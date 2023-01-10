import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
//sendEmailVerification,

const createUserFun = async (userEmail, userPassword,userName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    await updateProfile(auth.currentUser, { displayName: userName })
    userAuthState();
  } catch (err) {
    console.log(err.message);
  }
};

const userAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      window.location.href = `./dashboard.html`;
      // const uid = user.uid;
    } else {
      console.log("User is signed out");
    }
  });
};
userAuthState();

document.querySelector("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const userEmail = document.querySelector("#signupUserEmail").value;
  const userPassword = document.querySelector("#signupUserPassword").value;
  const userName = document.querySelector("#signupUserName").value;
  
  
  createUserFun(userEmail, userPassword,userName);
});

// displayName
