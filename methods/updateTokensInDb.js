import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
const db = require('../firebase/firebaseRequire');
const axios = require('axios');


async function updateTokensInDb(tokens) {
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
