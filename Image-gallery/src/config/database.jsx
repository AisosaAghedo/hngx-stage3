// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_vIjjEMSW_6TCA7OTmCivIF6RI-xhad0",
  authDomain: "image-gallery-d809b.firebaseapp.com",
  projectId: "image-gallery-d809b",
  storageBucket: "image-gallery-d809b.appspot.com",
  messagingSenderId: "362812253410",
  appId: "1:362812253410:web:963f1309a33a9468652abb",
  measurementId: "G-Y6234CDS8P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const storage = getStorage(app)