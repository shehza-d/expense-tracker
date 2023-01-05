
// import { auth } from "./firebase";

//  signInBtn.onclick = () => auth.signInWithPopup(provider); 
  
//  signOutBtn.onclick = () => auth.signOut(); 
  
//  auth.onAuthStateChanged(user => { 
//      if (user) { 
//          // signed in 
//          whenSignedIn.hidden = false; 
//          whenSignedOut.hidden = true; 
//          userDetails.innerHTML = `<h3>Hello ${user.displayName}!</h3> <p>User ID: ${user.uid}</p>`; 
//      } else { 
//          // not signed in 
//          whenSignedIn.hidden = true; 
//          whenSignedOut.hidden = false; 
//          userDetails.innerHTML = ''; 
//      } 
//  }); 
  


//  ///// Firestore /////   
//  const createThing = document.getElementById('createThing'); 
//  const thingsList = document.getElementById('thingsList'); 
  
  
//  let thingsRef; 
//  let unsubscribe; 
  
//  auth.onAuthStateChanged(user => { 
  
//      if (user) { 
  
//          // Database Reference 
//          thingsRef = db.collection('things') 
  
//          createThing.onclick = () => { 
  
//              const { serverTimestamp } = firebase.firestore.FieldValue; 
  
//              thingsRef.add({ 
//                  uid: user.uid, 
//                  name: faker.commerce.productName(), 
//                  createdAt: serverTimestamp() 
//              }); 
//          } 
  
  
//          // Query 
//          unsubscribe = thingsRef 
//              .where('uid', '==', user.uid) 
//              .orderBy('createdAt') // Requires a query 
//              .onSnapshot(querySnapshot => { 
                  
//                  // Map results to an array of li elements 
  
//                  const items = querySnapshot.docs.map(doc => { 
  
//                      return `<li>${doc.data().name}</li>` 
  
//                  }); 
  
//                  thingsList.innerHTML = items.join(''); 
  
//              }); 
  
  
  
//      } else { 
//          // Unsubscribe when the user signs out 
//          unsubscribe && unsubscribe(); 
//      } 
//  });



//  const loderFun=()=>{
//  let loader = document.getElementById("loader")
//  // prof.style.display="block"
//  loader.style.display="none"
//  }