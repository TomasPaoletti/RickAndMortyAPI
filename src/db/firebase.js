import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_API_KEY}`,
    authDomain: 'pruebatecnica-a5aa8.firebaseapp.com',
    projectId: 'pruebatecnica-a5aa8',
    storageBucket: 'pruebatecnica-a5aa8.appspot.com',
    messagingSenderId: "1070497441755",
    appId: "1:1070497441755:web:b0e743309368f1bd12e9fe"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);