// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.REACT_APP_apiKey,
  authDomain:process.env.REACT_APP_authDomain,
  projectId:process.env.REACT_APP_projectId,
  storageBucket:process.env.REACT_APP_storageBucket,
  messagingSenderId:process.env.REACT_APP_messagingSenderId,
  appId:process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// apiKey: "AIzaSyAECG1NVzKeCCNkIxSsTFxfcNitmnqi78o",
// authDomain: "midea-cca76.firebaseapp.com",
// projectId: "midea-cca76",
// storageBucket: "midea-cca76.appspot.com",
// messagingSenderId: "388514726942",
// appId: "1:388514726942:web:558ca503e9e4e9ec7a1a0f"