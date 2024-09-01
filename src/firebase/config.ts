import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const {
  VITE_FIRBASE_API_KEY,
  VITE_FIRBASE_AUTH_DOMAIN,
  VITE_FIRBASE_PROJECT_ID,
  VITE_FIRBASE_STORAGE_BUCKET,
  VITE_FIRBASE_MESAGING_SENDER_ID,
  VITE_FIRBASE_APP_ID,
} = import.meta.env;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_FIRBASE_API_KEY,
  authDomain: VITE_FIRBASE_AUTH_DOMAIN,
  projectId: VITE_FIRBASE_PROJECT_ID,
  storageBucket: VITE_FIRBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIRBASE_MESAGING_SENDER_ID,
  appId: VITE_FIRBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Auth = getAuth(app);
