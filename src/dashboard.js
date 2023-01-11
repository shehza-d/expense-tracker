import { auth } from "./firebase.js";
import { db } from "./firebase.js";

import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"; //CDN
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
  setDoc,
  deleteDoc,
  where,
  updateDoc,
  limit,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"; //CDN

// const savePost =
(async () => {
  try {
    await onAuthStateChanged(auth, async (user) => {
      // to find the ID of Logged in user
      // console.log(user);
      await setDoc(doc(db, user.uid, "cash"), {
        amount: 0,
        category: "default",
        createdOn: serverTimestamp(),
      });

      await setDoc(doc(db, user.uid, "savings"), {
        amount: 0,
        category: "default2",
        createdOn: serverTimestamp(),
      });

      await setDoc(doc(db, user.uid, "transactionsHistory"), {
        amount: 0,
        category: "default",
        createdOn: serverTimestamp(),
      });

      // await addDoc(collection(db, user.uid), {dataObj });
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
})();
// savePost();

const addAmountFun = () => {};

const transactionFun = async () => {
  const inputValuee = Number(document.querySelector("#inputAmount").value);

  const selectedAccount = document.querySelector("#typeSelect").value;
  if (selectedAccount === "none") return alert("please select another account");
  try {
    await onAuthStateChanged(auth, async (user) => {
      await updateDoc(doc(db, user.uid, selectedAccount), {
        amount: inputValuee,
      });
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  // data.totalAmount =

  // rerendering();
  // console.log(data); ///////
};
// transactionFun()
// document.querySelector("#expenseBtn").addEventListener("click", () => {
//   data.totalAmount -= Number(document.querySelector("#inputAmount").value);
//   document.querySelector("#amountValue").innerHTML = data.totalAmount;

//   localStorage.setItem("expenseData", JSON.stringify(data)); ///
//   rerendering(); /////
// });

document.querySelector("#incomeBtn").addEventListener("click", transactionFun);

// (() => {
//   const q = query(
//     collection(db, "posts"),
//     orderBy("createdOn", "desc"),
//     limit(60)
//   );
//     onSnapshot(q, (querySnapshot) => {
//     const posts = [];
//     querySnapshot.forEach((doc) => {
//       posts.push({ id: doc.id, ...doc.data() });
//       // console.log({ id: doc.id, ...doc.data() })
//     });
//     setPosts(posts);
//     console.log("posts", posts);
//   });
// })();

// //
// try {
//   const docRef = await addDoc(collection(db, "posts"), {
//     text: postText,
//     createdOn: serverTimestamp(),
//   });
//   // console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }
// //

// const updatePost = async (e) => {
//   setDropDown(false);
//   e.preventDefault();
//   await updateDoc(doc(db, "posts", editing.editingId), {
//     text: editing.editingText,
//   });
//   setEditing({
//     editingId: null,
//     editingText: "",
//   });
//   setDropDown(false);
// };

// $$$$$$$$$$$$$$$$$$$$$$$$$- Local Storage Approach -$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// let data = JSON.parse(localStorage.getItem("expenseData")) || {
//   userName: "Shehzad",
//   totalAmount: 0,
//   accounts: { cash: 0, bank: 0, saving: 0 },
// };

// const transaction = () => {
//   const inputValuee = Number(document.querySelector("#inputAmount").value);

//   const select = document.querySelector("#typeSelect").value;
//   if (select === "cash") {
//     data.accounts.cash += inputValuee;
//   } else if (select === "saving") {
//     data.accounts.saving += inputValuee;
//   } else if (select === "bank") {
//     data.accounts.bank += inputValuee;
//   } else {
//     alert("please select another account");
//   }
//   data.totalAmount =
//     data.accounts.cash + data.accounts.saving + data.accounts.bank;
//   localStorage.setItem("expenseData", JSON.stringify(data)); ///
//   rerendering();
//   console.log(data); ///////
// };

// document.querySelector("#expenseBtn").addEventListener("click", () => {
//   data.totalAmount -= Number(document.querySelector("#inputAmount").value);
//   document.querySelector("#amountValue").innerHTML = data.totalAmount;

//   localStorage.setItem("expenseData", JSON.stringify(data)); ///
//   rerendering(); /////
// });

// document.querySelector("#incomeBtn").addEventListener("click", transaction);

// $$$$$$$$$$$$$$$$$$$$$$$$$- Local Storage Approach -$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//re-rendering to update data
const rerendering = () => {
  // document.querySelector("#cashAmountSpan").innerHTML = data.accounts.cash;
  // document.querySelector("#savingAmountSpan").innerHTML = data.accounts.saving;
  // document.querySelector("#bankAmountSpan").innerHTML = data.accounts.bank;
  // document.querySelector("#amountValue").innerHTML = data.totalAmount;
};
rerendering();

//LOG-OUT System
document.querySelector("#logOutBtn").addEventListener("click", async () => {
  const res = confirm("Are you sure you wanna logOut");
  if (res) {
    try {
      const res = await signOut(auth);
      // Sign-out successful.
      console.log(res);
    } catch (err) {
      // An error happened.
      console.log(err);
      const errorCode = err.code;
      const errorMessage = err.message;
    } finally {
      userAuthState();
    }
  }
});
const userAuthState = async () => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user);user.uid
    } else {
      window.location.href = "./login.html";
      console.log("User is signed out");
    }
  });
};
userAuthState();

/*
notes
we should make our collection large and document small in order to make for efficent qurrys*/
