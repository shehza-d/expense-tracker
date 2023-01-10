import { auth } from "./firebase.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// (()=>window.location.href=`./dashboard.html`)();
(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
      window.location.href = `./dashboard.html`;
      // const uid = user.uid;
    } else {
      console.log("User is signed out");
    }
  });
})();

const logInFun = async (userEmail, userPassword) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
      console.log(user);
    // ...
  } catch (err) {
    console.log(err.code);
  }
};

document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const userEmail = document.querySelector("#loginUserEmail").value;
  const userPassword = document.querySelector("#loginUserPassword").value;

  logInFun(userEmail, userPassword);
});
