import styles from '../styles/Home.module.css'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { provider, auth } from '../firebase/firebaseConfig.js';
import { useState } from 'react';
import { setCookies } from 'cookies-next';
import { getCookie, getCookies } from 'cookies-next';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const signupOrLogin = (signupOrLogin) => {
  // access the token from the cookie 'googleToken'
  // this is probably a temporary solution to storing the token
  const token = getCookie('googleToken');
  let accountConfirmed = false;
  provider.addScope("https://www.googleapis.com/auth/calendar");
  return signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    setCookies('googleToken', token);

    const userRef = doc(db, 'user_cal_data', user.email);

    return getDoc(userRef)
      .then((userSnap) => {
        if (signupOrLogin === 'signup') {
          if (userSnap.exists()) {
            alert('An account has already been created with this email. Log in instead?');
            throw new Error('account already exists');
          } else {
            console.log('New user being created');
            accountConfirmed = true;
            return user;
          }
        }

        if (signupOrLogin === 'login') {
          if (userSnap.exists()) {
            console.log('signing in...');
            // setCookies('googleToken', token);
            accountConfirmed = true;
            return user;
          } else {
            alert('No account associated with this email. Sign up instead?');
            throw new Error('account does not exist');
          }
        }
      })
  })
  .then(() => {
    token = getCookie('googleToken');
    getCalendarList(token);
    return accountConfirmed;
  })
  .catch((error) => {
    console.log('error', error);
  });
}

const getCalendarList = (token) => {
  let url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
  // attach the token from the cookie to the authorization header
  let headers = {
    'Authorization': 'Bearer ' + token,
  }

  fetch(url, {headers: headers})
    .then(res => {
      // console.log('CALENDAR LIST:', res)
      res.json()
    })
    .then(json => getFreeBusyForWeek(json, token))
    .catch(error => console.log('this error', error))
}

const getFreeBusyForWeek = (calendars, token) => {
  // TODO implement day, week, month durations

  let url = 'https://www.googleapis.com/calendar/v3/freeBusy';
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  // get the date a week from now
  let nextWeek  = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
  let timeMin = today.toISOString();
  let timeMax = nextWeek.toISOString();

  let body = {
    timeMin,
    timeMax,
    // need to handle user time zone but for now west coast = best coast
    timeZone: 'PST',
    items: calendars.items,
  }

  let headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }

  fetch(url, {headers: headers, body: JSON.stringify(body), method: 'POST'})
    .then(res => res.json())
    .then(json => {
      const calData = json;
      const auth = getAuth();
      const user = auth.currentUser;
      const userInstance = collection(db, 'user_cal_data');
      setDoc(doc(db, 'user_cal_data', user.email), {
        friends: [],
        timeMin: calData.timeMin,
        timeMax: calData.timeMax,
        busy: calData.calendars[user.email].busy,
        displayName: user.displayName,
        profilePic: user.photoURL,
        userId: user.uid,
      });
    })
    .catch(error => console.log(error))
}

  // gets info about current user but DB logic is already implemented in sign up process -- this is just if we ever need to get current user's data but i think we would ever need to bc we're changing state based on sign in
  // const getUserInfo = () => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   if (user !== null) {
  //     const displayName = user.displayName;
  //     const email = user.email;
  //     const photoURL = user.photoURL;
  //     const emailVerified = user.emailVerified;
  //     const uid = user.uid;
  //   }
  // }


/*
 * TODO
 * We need to get refresh tokens for the user. It's hard to get a clear
 * answer from the documentation on this. We might be given on one-time-only
 * when the user signs up, otherwise we might need to write a server
 * and integrate googleapis, which will need to be integrated with firebase
 *
 *
 * Other API calls to implement
 *
 * addEventToCalendar
 *
 * deleteEventFromCalendar
 *
 * updateCalendar
*/
