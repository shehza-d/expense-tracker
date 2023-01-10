import { auth } from "./firebase.js";
import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   doc,
//   onSnapshot,
//   query,
//   serverTimestamp,
//   orderBy,
//   deleteDoc,
//   updateDoc,
//   limit,
// } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// import { db } from "../../firebase";

// import { doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// document.querySelector("#signup-form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const userName = document.querySelector("#signup-user-email").value;
//   const userPassword = document.querySelector("#signup-user-password").value;

//   // console.log('ru',userName,userPassword);
// });
// let unsubscribe;
// (() => {
//   const q = query(
//     collection(db, "posts"),
//     orderBy("createdOn", "desc"),
//     limit(60)
//   );
//   unsubscribe = onSnapshot(q, (querySnapshot) => {
//     const posts = [];
//     querySnapshot.forEach((doc) => {
//       posts.push({ id: doc.id, ...doc.data() });
//       // console.log({ id: doc.id, ...doc.data() })
//     });
//     setPosts(posts);
//     console.log("posts", posts);
//   });
// })();

// //this is useEffect cleanup and is called when i leave this useEffect
// return () => {
//   unsubscribe();
// };

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

// signoutBtn.addEventListener("click", () => {
//   signOut(auth)
//     .then(() => {
//       window.location.href = "index.html";
//       console.log("logout");
//     })
//     .catch((error) => {
//       // An error happened.
//       console.log("login");
//     });
// });

// const deletePost = async () => await deleteDoc(doc(db, "posts", props.id));
// // console.log("postId: ", props.id);

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

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

let data = JSON.parse(localStorage.getItem("expenseData")) || {
  userName: "Shehzad",
  totalAmount: 0,
  accounts: { cash: 0, bank: 0, saving: 0 },
};
//
// new logic
// arrayOfTodos.push(todo);
// localStorage.setItem("expenseData", JSON.stringify(data));

// document.querySelector("#todoList").innerHTML = ``;
// document.querySelector("#todoItem").value = ``;

// let data.totalAmount = 0;
// document.querySelector("#amountValue").innerHTML = data.totalAmount; ///////

const transaction = () => {
  const inputValuee = Number(document.querySelector("#inputAmount").value);

  const select = document.querySelector("#typeSelect").value;
  if (select === "cash") {
    data.accounts.cash += inputValuee;
  } else if (select === "saving") {
    data.accounts.saving += inputValuee;
  } else if (select === "bank") {
    data.accounts.bank += inputValuee;
  } else {
    alert("please select another account");
  }
  data.totalAmount =
    data.accounts.cash + data.accounts.saving + data.accounts.bank;
  localStorage.setItem("expenseData", JSON.stringify(data)); ///
  rerendering();
  console.log(data); ///////
};

document.querySelector("#expenseBtn").addEventListener("click", () => {
  data.totalAmount -= Number(document.querySelector("#inputAmount").value);
  document.querySelector("#amountValue").innerHTML = data.totalAmount;

  localStorage.setItem("expenseData", JSON.stringify(data)); ///
  rerendering(); /////
});

document.querySelector("#incomeBtn").addEventListener("click", transaction);

//re-rendering to update data
const rerendering = () => {
  document.querySelector("#cashAmountSpan").innerHTML = data.accounts.cash;
  document.querySelector("#savingAmountSpan").innerHTML = data.accounts.saving;
  document.querySelector("#bankAmountSpan").innerHTML = data.accounts.bank;

  document.querySelector("#amountValue").innerHTML = data.totalAmount;
};
rerendering();

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
const userAuthState = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // window.location.href = "./dashboard.html";
      console.log(user);
      // const uid = user.uid;
    } else {
      window.location.href = "./login.html";
      console.log("User is signed out");
    }
  });
};
userAuthState();
