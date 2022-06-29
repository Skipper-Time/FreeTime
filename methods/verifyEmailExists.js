import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const verifyEmailExists = (email) => {

  fetch(url, {
    headers: headers,
    body: JSON.stringify(calData),
    method: 'POST'
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}