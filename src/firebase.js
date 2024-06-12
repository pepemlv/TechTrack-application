// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA-3XLthbm_3flQeVM9cuVI5gzdpvKrDFs",
    authDomain: "my-app-27069.firebaseapp.com",
    projectId: "my-app-27069",
    storageBucket: "my-app-27069.appspot.com",
    messagingSenderId: "390870095276",
    appId: "1:390870095276:web:028858b61756208a039609"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

