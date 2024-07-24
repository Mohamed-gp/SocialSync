// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "socialsync-194bd.firebaseapp.com",
  projectId: "socialsync-194bd",
  storageBucket: "socialsync-194bd.appspot.com",
  messagingSenderId: "574149802275",
  appId: "1:574149802275:web:e6d297a79738b8b65ab496",
  measurementId: "G-68XQNLV0MW",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
