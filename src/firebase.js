import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbsIY2oDW2IvUp5G6mwLUPfyeuw8Duk2U",
    authDomain: "finance-react-app-63c8b.firebaseapp.com",
    projectId: "finance-react-app-63c8b",
    storageBucket: "finance-react-app-63c8b.appspot.com",
    messagingSenderId: "888812357103",
    appId: "1:888812357103:web:3c75edd0fec50e1675a21a"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize authentication
const auth =getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db, auth};