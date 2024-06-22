// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "blog-2b12b.firebaseapp.com",
  projectId: "blog-2b12b",
  storageBucket: "blog-2b12b.appspot.com",
  messagingSenderId: "22765839674",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage();
export default app;
