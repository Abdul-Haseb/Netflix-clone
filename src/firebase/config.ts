import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFS4qpSEM29Y_qgwXHa-tWXkgsCVO-PAc",
  authDomain: "netlify-6f701.firebaseapp.com",
  projectId: "netlify-6f701",
  storageBucket: "netlify-6f701.appspot.com",
  messagingSenderId: "175046071160",
  appId: "1:175046071160:web:bfbe72e5e34b4c920dae8d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
