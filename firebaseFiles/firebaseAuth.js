import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect} from 'react';

// Initialize Authentication
const auth = getAuth();

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

// Custom Hook
export function useAuth(){
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => { 
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])
  return currentUser;
}