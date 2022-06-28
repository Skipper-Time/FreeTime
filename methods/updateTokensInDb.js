import { doc, setDoc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

// INSERT or UPDATE access token, refresh token
// WHERE email = input email
module.exports = async function updateTokensInDb(email) {
}
