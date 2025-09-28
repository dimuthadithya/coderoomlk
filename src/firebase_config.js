// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCILPNHdNGsnsqKejPfU7WyNFvwr0V1iiE',
  authDomain: 'coderoomlk-0.firebaseapp.com',
  projectId: 'coderoomlk-0',
  storageBucket: 'coderoomlk-0.firebasestorage.app',
  messagingSenderId: '199469156645',
  appId: '1:199469156645:web:b5e7635b47522293eeb2cc',
};

const app = initializeApp(firebaseConfig); // Initialize app
const db = getFirestore(app); // Initialize Firestore
// Auth + Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, db, auth, provider }; // export both for use in your project
