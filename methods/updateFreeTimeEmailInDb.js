import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
const db = require('../firebase/firebaseRequire');

const axios = require('axios');
async function updateFreeTimeEmailInDb(email, freeTimeEmail) {
  const userRef = doc(db, 'user_cal_data', email);
  setDoc(userRef, {
    freeTimeEmail: freeTimeEmail,
  }, { merge: true });
}

module.exports = updateTokensInDb;
