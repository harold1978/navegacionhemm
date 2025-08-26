// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDwL_1XwuVw2CXobRSs7pXz8SiZS4CqRgE',
  authDomain: 'ingreso123hemm.firebaseapp.com',
  projectId: 'ingreso123hemm',
  storageBucket: 'ingreso123hemm.firebasestorage.app',
  messagingSenderId: '525127596454',
  appId: '1:525127596454:web:9011eaea9ddefe6b15b767',
  measurementId: 'G-T3R1BKRFT7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export { db };
