// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9HcvNdKOiS_4RcZClpy02oWKaD-Z0gAs",
  authDomain: "lifesync-d02e1.firebaseapp.com",
  databaseURL: "https://lifesync-d02e1-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lifesync-d02e1",
  storageBucket: "lifesync-d02e1.appspot.com",
  messagingSenderId: "305976432170",
  appId: "1:305976432170:web:dd839a10e6aa4aa1965553",
  measurementId: "G-BG64RFS4Q0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
export const db = getFirestore(app);
export const storage = getStorage(app);