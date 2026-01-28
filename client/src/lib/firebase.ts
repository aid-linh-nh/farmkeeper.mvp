import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAHCOHQtH315hBFKKc5eAmk1Oy1NV6IDww",
    authDomain: "farmkeeper-mvp.firebaseapp.com",
    projectId: "farmkeeper-mvp",
    storageBucket: "farmkeeper-mvp.firebasestorage.app",
    messagingSenderId: "96597206900",
    appId: "1:96597206900:web:b77c18b19993b5b2a6ee21"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
