import React from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup } from "firebase/auth";

// To redirect from this page to another.
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {

  let navigate = useNavigate();

  const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {

        // if we close our tab and then open it again, we should still be logged in.
        // we put isAuth in the local Storage, (check in application, near console on localhost page)
        localStorage.setItem("isAuth", true);

        // set the value of isAuth useState to true in app.js file
        setIsAuth(true);

        // when we successfully login, then redirect to home page.
        navigate("/");
      })

  };

  return (
    <div className='loginPage'>
      <p>Sign In With Google to Continue</p>

      <button className='login-with-google-btn' onClick={signInWithGoogle} >
        Sign In with Google
      </button>
    </div>
  )
}

export default Login
