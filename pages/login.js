import styles from '../styles/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {provider, auth} from '../firebase/firebaseConfig.js';
import { useState } from 'react';
import { setCookies } from 'cookies-next';

export default function Home() {
  const signUp = () => {
    provider.addScope("https://www.googleapis.com/auth/calendar");
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log('credential', credential.accessToken);
      const token = credential.accessToken;
      console.log('token', token);
      // The signed-in user info.
      const user = result.user;
      console.log('user', user)
      setCookies('googleToken', token);
    })
      .catch((error) => {
        console.log(error);
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }

  return (
    <div className={styles.container}>
      <button onClick={signUp}>click me for auth</button>
    </div>
  )
}
