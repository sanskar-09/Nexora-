import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGHi0gMByKsYXUj7ZnZvfC_f0PBWiMLB8",
  authDomain: "nexora-health.firebaseapp.com",
  projectId: "nexora-health",
  storageBucket: "nexora-health.firebasestorage.app",
  messagingSenderId: "584812836163",
  appId: "1:584812836163:web:8c893bf70a8a07db9e2bf6",
  measurementId: "G-TJRCS9WGD9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize providers
const googleProvider = new GoogleAuthProvider();
const phoneProvider = new PhoneAuthProvider(auth);

export { app, analytics, auth, googleProvider, phoneProvider }; 