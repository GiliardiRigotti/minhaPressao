// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUaN44Mu9TPUjrq6yHu7hqkmwBraEnt0U",
    authDomain: "minhapressao-5c2ce.firebaseapp.com",
    projectId: "minhapressao-5c2ce",
    storageBucket: "minhapressao-5c2ce.appspot.com",
    messagingSenderId: "56449935162",
    appId: "1:56449935162:web:417adb48b6c8e1e162d203",
    measurementId: "G-G6SB087RPB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app);

export {
    analytics,
    auth,
    db
}