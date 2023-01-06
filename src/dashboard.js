// Import the functions you need from the SDKs you need
// import { db } from "../../firebase";

// import { doc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



// document.querySelector("#signup-form").addEventListener("submit", (e) => {
//   e.preventDefault();

//   const userName = document.querySelector("#signup-user-email").value;
//   const userPassword = document.querySelector("#signup-user-password").value;

//   // console.log('ru',userName,userPassword);
// });


function transaction(){
  console.log("hello");
}






























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
