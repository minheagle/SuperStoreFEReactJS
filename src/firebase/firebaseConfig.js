import firebase from "firebase/app";

import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCJsFZmf5rGLUTOsM3aY9lrsVtse_dcFuI",
  authDomain: "superstore-88f7b.firebaseapp.com",
  projectId: "superstore-88f7b",
  storageBucket: "superstore-88f7b.appspot.com",
  messagingSenderId: "662071884997",
  appId: "1:662071884997:web:9b83997042298807af44ac",
  measurementId: "G-YWX8BMRYCN",
});

const firestore = firebase.firestore();

export default firestore;
