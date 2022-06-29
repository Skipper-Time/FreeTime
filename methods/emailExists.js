import { doc, collection, query, where, getDoc } from "firebase/firestore";
const db = require('../firebase/firebaseRequire');

module.exports = async function emailExists (email) {
  const docRef = doc(db, "user_cal_data", email);
  let  docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log(`Document data: ${docSnap.data()}`);
    return true;
  }
  else {
    console.log('No such document exists');
    return false;
  }
}