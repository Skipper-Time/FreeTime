import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
// import { db } from '../firebase/firebaseConfig.js';
const db = require('../firebase/firebaseRequire');
console.log('DB outside of function', db);
//
// const db = require('../firebase/firebaseConfig');
const axios = require('axios');
// INSERT or UPDATE access token, refresh token
// WHERE email = input email
async function updateTokensInDb(tokens) {
  console.log('DB inside function', db);
  // fetch the user id from id_token from tokens
  const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.id_token}`
  const userInfo = await axios.get(url);

  const email = userInfo.data.email; // i think
  const accessToken = tokens.access_token;
  const refreshToken = tokens.refresh_token;

const userRef = doc(db, 'user_cal_data', email);
setDoc(userRef, {
  tokens: {
    accessToken: accessToken,
    refreshToken: refreshToken,
} }, { merge: true });

}

module.exports = updateTokensInDb;
