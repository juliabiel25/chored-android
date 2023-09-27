// Import the functions you need from the SDKs you need

import { getFirestore, initializeFirestore } from "@firebase/firestore";

import { getAuth } from "@firebase/auth";
import { initializeApp } from "@firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDYhOFqunNmjXSu40KCcG1LQpBGpKdgZiE",

  authDomain: "chored-73157.firebaseapp.com",

  projectId: "chored-73157",

  storageBucket: "chored-73157.appspot.com",

  messagingSenderId: "1085094715889",

  appId: "1:1085094715889:web:3d85b8c2cfc4d48722e450"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });
