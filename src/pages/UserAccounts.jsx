import db from "../../firebaseFiles/firebaseConfig"; // importing database
import { useEffect, useState, useRef } from 'react';
// onSnapshot gets data in realtime getData only gets data once, so we use onSnapshot
import { collection, onSnapshot, setDoc, doc, addDoc, getDocs } from 'firebase/firestore';
import {signup, useAuth, logout, login} from '../../firebaseFiles/firebaseAuth.js';

export const AuthPage = () => {

    const [loading, setLoading] = useState(false);
    const currentUser = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();

    async function handleSignup(){
      setLoading(true);
      try{
        await signup(emailRef.current.value, passwordRef.current.value);
      } catch {
        alert("Error!");
      }
      setLoading(false);
    }

    async function handleLogout(){
      setLoading(true);
      try {
        await logout();
      } catch {
        alert("Error!");
      }
      setLoading(false);
    }

    async function handleLogin(){
      setLoading(true);
      try {
        await login(emailRef.current.value, passwordRef.current.value);
      } catch {
        alert("Error!");
      }
      setLoading(false);
    }

  return <>

  {/* authentication code */}
    <div>Current user: {currentUser?.email} </div>
  <div className='credFields'>
    <input ref = {emailRef} placeholder='Email' />
    <input ref = {passwordRef} type='password' placeholder='Password' />
  </div>

  <div className='credButtons'>
    <button disabled={loading || currentUser} onClick={handleSignup}> Sign Up </button>
    <button disabled={loading || !currentUser} onClick={handleLogout}> Log Out </button>
    <button disabled={loading || currentUser} onClick={handleLogin}> Log in </button>
  </div>
  </>

}

export default AuthPage;