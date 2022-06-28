// import {signupOrLogin} from '../methods/google';
import { useRouter } from 'next/router'

import { useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import {provider, auth, db} from '../firebase/firebaseConfig.js';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [signupOrLogin, setSignupOrLogin] = useState(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post('/api/auth/google', { code });

        const refreshToken = tokens.data.refresh_token;
        const accessToken = tokens.data.access_token;
        const idToken = tokens.data.id_token;

        const credential = await GoogleAuthProvider.credential(idToken);
        const currentUser = await signInWithCredential(auth, credential);

        // SAMPLE API CALL to /api/cal
        const url = `/api/cal?accessToken=${accessToken}&refreshToken=${refreshToken}`;
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        // END SAMPLE

        setUser(currentUser);
      } catch (error) {
        console.log(error);
      }
    },
    flow: 'auth-code',
  });

  const validateLogin = (user, signupOrLogin) => {
    console.log(user, signupOrLogin)
    const userRef = doc(db, 'user_cal_data', user.user.email);

    getDoc(userRef)
      .then((userSnap) => {
        if (signupOrLogin === 'signup') {
          if (userSnap.exists()) {
            alert('An account has already been created with this email. Log in instead?');
            setUser(null);
            setSignupOrLogin(null);
            throw new Error('account already exists');
          } else {
            console.log('New user being created');
            router.push('/calendar');
          }
        }

        if (signupOrLogin === 'login') {
          if (userSnap.exists()) {
            console.log('signing in...');
            // setCookies('googleToken', token);
            router.push('/calendar');
          } else {
            setUser(null);
            setSignupOrLogin(null);
            alert('No account associated with this email. Sign up instead?');
            throw new Error('account does not exist');
          }
        }
      })
      .catch(error => console.log('error', error));
  }

  if (user !== null) { validateLogin(user, signupOrLogin) }

  if (user === null) {
    return (
      <>
        <button onClick={() => { googleLogin(); setSignupOrLogin('login') }}>login</button>
        <button onClick={() => { googleLogin(); setSignupOrLogin('signup') }}>signup</button>
      </>
    );
  } else {
    return null;
  }
}
