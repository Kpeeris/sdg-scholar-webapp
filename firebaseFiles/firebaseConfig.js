// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sdg-scholar.firebaseapp.com",
  projectId: "sdg-scholar",
  storageBucket: "sdg-scholar.appspot.com",
  messagingSenderId: "118706304555",
  appId: "1:118706304555:web:77fb71aeb467bb673fdc6e",
};

// initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db;