
import { doc, collection, query, where, getDoc } from "firebase/firestore";

const db = require('../firebase/firebaseRequire');
// query USERS database matching EMAIL
// return access token and refresh token
//
module.exports = async function queryDbForTokens(email) {
  const docRef = doc(db, "user_cal_data", email);
  let  docSnap = await getDoc(docRef);
  docSnap = docSnap.data();
  return docSnap.freeTimeEmail;
}
