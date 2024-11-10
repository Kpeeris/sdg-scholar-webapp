import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

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
const db = getFirestore(app);

//connect to Firestore emulator if in test environment
if (process.env.NODE_ENV === "test") {
  connectFirestoreEmulator(db, "localhost", 8080);
}

export { app };
export default db;
