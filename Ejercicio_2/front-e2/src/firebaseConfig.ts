// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   collection,
//   addDoc,
//   getDocs,
//   onSnapshot,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAXIrNQPhlwFohvT0OKIrlXvVIIVx8AhNo",
//   authDomain: "crud-e2-react.firebaseapp.com",
//   projectId: "crud-e2-react",
//   storageBucket: "crud-e2-react.appspot.com",
//   messagingSenderId: "1057895906773",
//   appId: "1:1057895906773:web:60e02d9229d97dc588915c",
// };

// // Initialize Firebase
// const fb = initializeApp(firebaseConfig);

// const db = getFirestore(fb);

// export { db, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc };

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXIrNQPhlwFohvT0OKIrlXvVIIVx8AhNo",
  authDomain: "crud-e2-react.firebaseapp.com",
  projectId: "crud-e2-react",
  storageBucket: "crud-e2-react.appspot.com",
  messagingSenderId: "1057895906773",
  appId: "1:1057895906773:web:60e02d9229d97dc588915c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
