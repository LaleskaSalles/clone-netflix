import React, { useRef, useState } from 'react';
import "./SignUpScreen.css";
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function SignUpScreen() {
  const navegate = useNavigate();
  const emailRef = useRef(null)
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  };

  const register = (e) => {
    e.preventDefault();
    clearErrors();

    if (!emailRef.current.value && !passwordRef.current.value) {
      setEmailError('Required field');
      setPasswordError('Required field');
      return;
    } if(!emailRef.current.value){
      setEmailError('Required field');
      return;
    } if(!passwordRef.current.value){
      setPasswordError('Required field');
      return;
    }

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          setEmailError("Invalid email");
        }else if (error.code === "auth/weak-password") {
          setPasswordError("The password must be at least 6 characters long.");
        } else {
          alert(error.message);
        }
      });
  };

  const signIn = (e) => {
    e.preventDefault();
    clearErrors();

    if (!emailRef.current.value && !passwordRef.current.value) {
      setEmailError('Required field');
      setPasswordError('Required field');
      return;
    } if(!emailRef.current.value){
      setEmailError('Required field');
      return;
    } if(!passwordRef.current.value){
      setPasswordError('Required field');
      return;
    }


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
        if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
          setEmailError("Incorrect email or password");
          setPasswordError("Incorrect email or password");
        } else if (error.code === "auth/user-not-found") {
          setEmailError("User not found, sign up")
        } else {
          alert(error.message);
        }
      });
  }

  return (
    <div className='signUpScreen'>
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} placeholder='Email' type='email' onChange={clearErrors} />
        <span className="error">{emailError}</span>

        <input ref={passwordRef} placeholder='Password' type='password' onChange={clearErrors} />
        <span className="error">{passwordError}</span>

        <button className='signIn' type='submit' onClick={signIn}>Sign In</button>
        <h4>
          <span className='signUpScreen_gray'>New to Netflix? </span>
        </h4>
        <button className='signUp' type='submit' onClick={register}>Sign Up</button>
      </form>
    </div>
  )
}
