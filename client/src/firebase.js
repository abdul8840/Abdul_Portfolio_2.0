// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mernportfolio-ba0af.firebaseapp.com",
  projectId: "mernportfolio-ba0af",
  storageBucket: "mernportfolio-ba0af.appspot.com",
  messagingSenderId: "744823768108",
  appId: "1:744823768108:web:df4dea30bf6feee9bcbd89"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);