import React, { useRef } from 'react';
import "./SignUpScreen.css";
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function SignUpScreen() {
  const navegate = useNavigate();
  const emailRef = useRef(null)
  const passwordRef = useRef(null);

  const register = (e) =>{
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    .then((authUser) => {
      console.log(authUser);
    })
    .catch((error) => {
      alert(error.message)
    });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
    .then((authUser) => {
      console.log(authUser);
      navegate('/');
    })
    .catch((error) => {
      alert(error.message)
    });
  }

  return (
    <div className='signUpScreen'>
        <form>
            <h1>Sign In</h1>
            <input ref={emailRef} required={true} placeholder='Email' type='email'/>
            <input ref={passwordRef} required={true} placeholder='Password' type='password'/>
            <button className='signIn' type='submit' onClick={signIn}>Sign In</button>
            <button className='signUp' type='submit' onClick={register}>Sign Up</button>
        </form>
    </div>
  )
}
