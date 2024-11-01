import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";

// after each test it should clean it up
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// Replace this with your actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "sdg-scholar.firebaseapp.com",
  projectId: "sdg-scholar",
  storageBucket: "sdg-scholar.appspot.com",
  messagingSenderId: "118706304555",
  appId: "1:118706304555:web:77fb71aeb467bb673fdc6e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Connect to Firestore emulator (default port is 8080)
connectFirestoreEmulator(db, "localhost", 8080);

// Export the database for use in tests
export { db };
