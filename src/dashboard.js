// let arrayOfTodos = JSON.parse(localStorage.getItem("expenseData")) || {};
//
// new logic
// arrayOfTodos.push(todo);
// localStorage.setItem("todoList", JSON.stringify(arrayOfTodos));

// document.querySelector("#todoList").innerHTML = ``;
// document.querySelector("#todoItem").value = ``;
// refresh();

//
// let data.totalAmount = 0;

const data = {
  userName: "Shehzad",
  totalAmount: 0,
  accounts: { cash: 0, bank: 0, saving: 0 },
};

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
  data.totalAmount = data.accounts.cash + data.accounts.saving + data.accounts.bank;
  rerendering();
  console.log(data); ///////
};

document.querySelector("#expenseBtn").addEventListener("click", () => {
  data.totalAmount -= Number(document.querySelector("#inputAmount").value);
  document.querySelector("#amountValue").innerHTML = data.totalAmount;
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
