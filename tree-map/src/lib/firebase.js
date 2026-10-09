import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWqZvC8M9G2fAn8vwy519hVVHTTalvO24",
  authDomain: "tree-planting-app-2acd0.firebaseapp.com",
  projectId: "tree-planting-app-2acd0",
  storageBucket: "tree-planting-app-2acd0.firebasestorage.app",
  messagingSenderId: "747954899224",
  appId: "1:747954899224:web:aaa0dcdbce4ec00984f66d"
};

// Initialize Firebase (prevents duplicate initialization in Next.js)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };