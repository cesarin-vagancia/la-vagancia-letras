
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/13.2.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD50TG4XOSLebr1BMLTqFDnm0ttsKVyqTU",
  authDomain: "la-vagancia-letras.firebaseapp.com",
  projectId: "la-vagancia-letras",
  storageBucket: "la-vagancia-letras.firebasestorage.app",
  messagingSenderId: "961863093435",
  appId: "1:961863093435:web:0cd5d6695708df105cad9e"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
