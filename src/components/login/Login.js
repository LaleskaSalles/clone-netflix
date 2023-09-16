import { useState } from 'react';
import SignUpScreen from '../signUp/SignUpScreen';
import './Login.css'

function Login() {
    const [signIn, setSignIn] = useState(false)

  return (
    <div className='login'>
        <div className='login_background'>
            <img 
                className='login_logo'
                src='/Netflix-logo.png'
                alt=''
            />
            <button 
                className='login_button'
                onClick={() => setSignIn(true)}
            >
                Sign In
            </button>
            <div className='login_gradient'/>
        </div>

        <div className='login_body'>
            {signIn ? 
                (
                <SignUpScreen/>
                ) : (
                <>
                    <h1>Unlimited films, TV programmes and more.</h1>
                    <h2>Watch anywhere.  Cancel at any time</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>

                    <div className='login_input'>
                        <form>
                            <input type='email' placeholder='E-mail Address'/>
                            <button 
                                className='login_getStarted'
                                onClick={() => setSignIn(true)}>
                                    GET START
                            </button>
                        </form>
                    </div>
                </>
                )
            }
            
        </div>

    </div>
  )
}

export default Login
