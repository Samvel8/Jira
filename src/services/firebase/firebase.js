// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, setDoc, getDocs, doc, getDoc, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB5JThCk2QmacPw8WB503l68PL7kYL_Bg",
  authDomain: "my-project-97152-55468.firebaseapp.com",
  projectId: "my-project-97152-55468",
  storageBucket: "my-project-97152-55468.appspot.com",
  messagingSenderId: "104208341106",
  appId: "1:104208341106:web:4ce7482e02ddc6e1af4aeb",
  measurementId: "G-81HY9FRZ9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 


export {
    app, auth, db, getDocs, getDoc, collection, getFirestore, setDoc, doc, onAuthStateChanged
}
