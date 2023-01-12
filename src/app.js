import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

import { auth } from "./firebase.js";

console.log("checking authentication");
const userAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "./pages/dashboard.html";
      console.log(user);
      // const uid = user.uid;
    } else {
      window.location.href = "./pages/login.html";
      console.log("User is signed out");
    }
  });
};
setTimeout(userAuthState, 1600);
