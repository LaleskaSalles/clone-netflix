// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from './firebase'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyAC3vdJrbMvjas325owMcXWVv8Z79KGv_Q",
    authDomain: "clone-netflix-188be.firebaseapp.com",
    projectId: "clone-netflix-188be",
    storageBucket: "clone-netflix-188be.appspot.com",
    messagingSenderId: "961436640534",
    appId: "1:961436640534:web:38f002dfc28cae1466dc37",
    measurementId: "G-XX479Q4FB7"
  });

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { auth };
export default db;