import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCJ_ASpGHka8wUUhUNFVHmRAu1e7z0lVI4",
  authDomain: "darul-ihsan-d37b8.firebaseapp.com",
  projectId: "darul-ihsan-d37b8",
  storageBucket: "darul-ihsan-d37b8.firebasestorage.app",
  messagingSenderId: "473401074447",
  appId: "1:473401074447:web:9984d6830731501ac6d47a",
  measurementId: "G-6S6ZJ1R9Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;
