import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect} from 'react';
import {app} from './firebaseConfig';

// Initialize Authentication
const auth = getAuth(app);

export function signup(email, password){
  // any function from firebase/auth will take the handle "auth" as the first argument
  return createUserWithEmailAndPassword(auth, email, password); // returns whther it was a success of failure
}
export function logout(){
  // any function from firebase/auth will take the handle "auth" as the first argument
  return signOut(auth); // returns whther it was a success of failure
}

export function login(email, password){
  // any function from firebase/auth will take the handle "auth" as the first argument
  return signInWithEmailAndPassword(auth, email, password); // returns whther it was a success of failure
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email) // Sends the password reset email
    .then(() => {
      return "Password reset email sent.";
    })
    .catch((error) => {
      throw error;
    });
}

// Custom Hook
export function useAuth(){
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => { 
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}