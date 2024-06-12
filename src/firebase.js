// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "##########################3",
    authDomain: "my-app-27069.firebaseapp.com",
    projectId: "my-app-27069",
    storageBucket: "my-app-27069.appspot.com",
    messagingSenderId: "390870095276",
    appId: "1:390870095276:web:028858b61756208a039609"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
<<<<<<< HEAD:src/firebase.js
const db = getFirestore(app);

export { auth, db };

=======
export { db, auth };
>>>>>>> b0d27642d58184781ac18e770eb5d54b5d3ce1bc:src/firebase/FirebaseConfig.js
