import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYlg4_Tzs7V3EKb9P2QXx2-kagw0kaJYc",
  authDomain: "todo-app-ce2c8.firebaseapp.com",
  projectId: "todo-app-ce2c8",
  storageBucket: "todo-app-ce2c8.firebasestorage.app",
  messagingSenderId: "18482150454",
  appId: "1:18482150454:web:9bf3f459f40f08cc9dec97",
  measurementId: "G-5827JZK4L5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);