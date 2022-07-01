import { calendar_v3, google } from "googleapis";
import oAuth2Client from '../../firebase/oAuthConfig';
import { getCookie } from 'cookies-next';
import queryDbForFreeTimeEmail from '../../methods/queryDbForFreeTimeEmail.js';

const queryDbForTokens = require('../../methods/queryDbForTokens');

export default async function handler (req, res) {
  const email = req.query.email;
  const body = req.body;
  // console.log('BODY!!!!!!!!', body);

  const calendarId = await queryDbForFreeTimeEmail(email);
  // console.log('calId!!!!!!!!', calendarId);

  const tokens = await queryDbForTokens(email);
  const refreshToken = tokens.refreshToken;
  const accessToken = tokens.accessToken;

  oAuth2Client.setCredentials({
    refresh_token: refreshToken, // becomes tokens.refreshToken
    access_token: accessToken, // becomes tokens.accessToken
  });

  const calendar = google.calendar({
    version: "v3",
    auth: oAuth2Client,
  });

  const event = await calendar.events.insert({
    auth: oAuth2Client,
    // calendarId: '6l2kp84j5c1umogma09hnu3hkg@group.calendar.google.com',
    calendarId: calendarId,
    resource: body,
  });

  console.log(event);

//  const userRef = db.collection('user_cal_data').doc(email);
//
//  const  = await userRef.update({
//    regions: FieldValue.arrayUnion(event...)
//  });

  res.status(201).send('successfully added freetime event');
}
