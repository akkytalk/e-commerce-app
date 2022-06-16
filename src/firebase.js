import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0Uz7-6Va1jcvyM40xwW9RZkieYlpVO24",
  authDomain: "clone-7bbca.firebaseapp.com",
  projectId: "clone-7bbca",
  storageBucket: "clone-7bbca.appspot.com",
  messagingSenderId: "16212828098",
  appId: "1:16212828098:web:83c58fe6d0bb1578ca405b",
  measurementId: "G-R48RLHL5RJ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
