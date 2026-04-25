import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC52V1N_dYU86HCceBMJ5mJhOYuhDKsEDk",
  authDomain: "compliment-jar-c6639.firebaseapp.com",
  projectId: "compliment-jar-c6639",
  storageBucket: "compliment-jar-c6639.firebasestorage.app",
  messagingSenderId: "924180839508",
  appId: "1:924180839508:web:dd1bb1f5992e04a1a341c1",
  measurementId: "G-R6NL3CRCVV"
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
