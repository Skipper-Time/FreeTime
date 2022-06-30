import { calendar_v3, google } from "googleapis";
import oAuth2Client from '../../firebase/oAuthConfig';
import { getCookie } from 'cookies-next';

const queryDbForTokens = require('../../methods/queryDbForTokens');
const queryDbForFreeTimeEmail = require('../../methods/queryDbForFreeTimeEmail');

/*
 * URL: /api/freeTimeEvents
 * QUERY: email
 *
 * EXAMPLE: /api/freeTimeEvents?email=jordan@gmail.com
 *
 * BODY: None
 *
 */

export default async function handler(req, res) {
  const email = req.query.email;
  // const timeRange = req.query.timeRage;

  // TODO Fetch refresh token, access token from firebase Db
  // instead of from cookie
  const tokens = await queryDbForTokens(email);
  const refreshToken = tokens.refreshToken;
  const accessToken = tokens.accessToken;
  console.log(tokens);

  // Set the credentials to the current person by adding the tokens to client
  oAuth2Client.setCredentials({
    refresh_token: refreshToken, // becomes tokens.refreshToken
    access_token: accessToken, // becomes tokens.accessToken
  });

  const freeTimeEmail = await queryDbForFreeTimeEmail(email);

//  let today = new Date();
//  today.setHours(0, 0, 0, 0);
//  // this is for one full week but it could be a month
//  let nextWeek  = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
//  let timeMin = today.toISOString();
//  let timeMax = nextWeek.toISOString();

  // configure the calendar api thing
  const calendar = google.calendar({
      version: "v3",
      auth: oAuth2Client,
  });

  const result = await calendar.events.list({
    calendarId: freeTimeEmail,
  });

  res.status(200).json(result.data.items);
}
