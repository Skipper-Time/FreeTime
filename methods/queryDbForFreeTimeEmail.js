
import { doc, collection, query, where, getDoc } from "firebase/firestore";

const db = require('../firebase/firebaseRequire');

module.exports = async function queryDbForFreeTimeEmail(email) {
  const docRef = doc(db, "user_cal_data", email);
  let  docSnap = await getDoc(docRef);
  docSnap = docSnap.data();
  return docSnap.freeTimeEmail;
}
