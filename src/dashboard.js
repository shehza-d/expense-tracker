import { auth } from "./firebase.js";
import { db } from "./firebase.js";

import {
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"; //CDN
import {
  collection,
  getDoc,
  query,
  doc,
  addDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"; //CDN

let userID;

// (async () => {
//   await onAuthStateChanged(auth, async (user) => {
//     userID = user.uid;
//   });
// })();// how to stop execution of code below this before

(async () => {
  // get all collection data Realtime
  try {
    await onAuthStateChanged(auth, async (user) => {
      userID = user.uid;
      await onSnapshot(collection(db, userID), async (myDataSnapShot) => {
        let userAccData = [];
        myDataSnapShot.docs.forEach((doc) =>
          userAccData.push({ ...doc.data(), id: doc.id })
        );
        let totalAmount = 0;
        userAccData?.forEach((item) => {
          if (typeof item.amount == "number") {
            totalAmount += item.amount;
          }
        });
        rerendering(totalAmount, userAccData);
        const data2 = await getDoc(doc(db, userID, "transactionsHistory"));
        transHistoryRenderer(data2.data().history);
      });
    });
  } catch (err) {
    console.log(err);
  }
  // .orderBy("amount", "asc")
})();

document
  .querySelector("#transactionForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    let inputValue1 = Number(document.querySelector("#inputAmount").value);
    const transType = document.querySelector(
      'input[name="transType"]:checked'
    ).value;

    const selectedAccount = document.querySelector("#typeSelect").value;
    if (selectedAccount === "none")
      return alert("please select another account");
    try {
      await onAuthStateChanged(auth, async (user) => {
        const data1 = await getDoc(doc(db, user.uid, selectedAccount));
        if (transType === "income") {
          if (data1.data().amount) inputValue1 += data1.data().amount;
          await updateDoc(doc(db, user.uid, selectedAccount), {
            amount: inputValue1,
          });
        } else if (transType === "expense") {
          if (data1.data().amount < inputValue1)
            return alert("Not enough money");
          let newVal = (data1.data().amount -= inputValue1);
          await updateDoc(doc(db, user.uid, selectedAccount), {
            amount: newVal,
          });
        }
        const data2 = await getDoc(doc(db, user.uid, "transactionsHistory"));
        transHistoryRenderer(data2.data().history);

        await updateDoc(doc(db, user.uid, "transactionsHistory"), {
          history: [
            ...data2.data().history,
            {
              account: selectedAccount,
              amount: inputValue1,
              category: "Category..",
              createdOn: new Date(), //serverTimestamp() is not supported in arrays
              transType: transType,
            },
          ],
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    rerendering();
  });
//       if (data1.data().amount < inputValue1) return alert("Not enough money");
//       let newVal = (data1.data().amount -= inputValue1);
//       await updateDoc(doc(db, user.uid, selectedAccount), {
//         amount: newVal,   })})}
// document.querySelector("#incomeBtn").addEventListener("click", transactionFun);

document
  .querySelector("#createNewAccountForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const newAccountName = document.querySelector("#newAccountName").value;
    const newAccountAmount =
      Number(document.querySelector("#newAccountAmount").value) || 0;

    try {
      await onAuthStateChanged(auth, async (user) => {
        await setDoc(doc(db, user.uid, newAccountName), {
          amount: newAccountAmount || 0,
          category: "default",
          createdOn: serverTimestamp(),
        });
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  });

//re-rendering to update data
const rerendering = (totalAmount, userAccData) => {
  let cashAmo;
  let savingAmo;
  let bankAmo;

  userAccData?.forEach((item) => {
    if (item.id === "cash") cashAmo = item.amount;
    if (item.id === "saving") savingAmo = item.amount;
    if (item.id === "bank") bankAmo = item.amount;
  });

  document.querySelector("#amountValue").innerHTML = totalAmount || 0;
  document.querySelector("#cashAmountSpan").innerHTML = cashAmo || 0;
  document.querySelector("#savingAmountSpan").innerHTML = savingAmo || 0;
  document.querySelector("#bankAmountSpan").innerHTML = bankAmo || 0;
};
rerendering();

// <tr>
//             <th scope="row">1</th>
//             <td>Shopping</td>
//             <td>Meezan Bank</td>
//             <td>10 Nov, 2021</td>
//             <td class="redd">Rs - 1500 Pkr</td>
// </tr>

const transHistoryRenderer = (arr, i) => {
  const table = document.querySelector("#transHistoryTable");

  arr?.forEach((item, i) => {
    const tr = document.createElement("tr");
    const th = document.createElement("th");
    th.appendChild(document.createTextNode(`${i + 1}`));
    tr.appendChild(th);
    const td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(item.category));
    const td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(item.transType));
    const td3 = document.createElement("td");
    td3.appendChild(document.createTextNode("13 Jan 2023"));
    const td4 = document.createElement("td");
    td4.appendChild(document.createTextNode(`Rs ${item.amount} PKR`));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    table.appendChild(tr);
    // console.log(item.account);
    // console.log(item.amount);
    // console.log(new Date(item));
  });
};

const renderAllAcc = async () => {
  const table = document.querySelector("#accountNames");
  const selectDropDown = document.querySelector("#typeSelect");
  await onAuthStateChanged(auth, async (user) => {
    await onSnapshot(collection(db, user.uid), (myDataSnapShot) => {
      // let table = document.querySelector("#accountNames").innerHTML=null
      let allAccData = [];
      myDataSnapShot.docs.forEach((doc) => {
        allAccData.push({ ...doc.data(), id: doc.id });
      });
      table.innerHTML = null;
      selectDropDown.innerHTML = null;

      allAccData.forEach((item) => {
        if (item.id && item.amount) {
          String(item.id);
          Number(item.amount);
          const tr = document.createElement("tr");
          const td1 = document.createElement("td");
          td1.appendChild(document.createTextNode(item.id));
          const td2 = document.createElement("td");
          td2.appendChild(document.createTextNode(`PKR ${item.amount}`));
          tr.appendChild(td1);
          tr.appendChild(td2);
          table.appendChild(tr);
          console.log(item.id, item.amount);
          const optionDropDown = document.createElement("option");
          optionDropDown.appendChild(document.createTextNode(item.id));
          selectDropDown.appendChild(optionDropDown);
        }
      });
    });
  });
};
renderAllAcc();
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

//LOG-OUT System
document.querySelector("#logOutBtn").addEventListener("click", async () => {
  const res = confirm("Are you sure you wanna logOut");
  if (res) {
    try {
      const res = await signOut(auth);
      // Sign-out successful.
      // console.log(res);
    } catch (err) {
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
      // console.log(user);//user.uid
    } else {
      window.location.href = "./login.html";
      console.log("User is signed out");
    }
  });
};
userAuthState();

// <!-- Chart JS for Expence Pie Chart -->
const ctx = document.getElementById("myChart");
new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "# of Votes",
        data: [19, 12],
        borderWidth: 1,
      },
    ],
  },
});
