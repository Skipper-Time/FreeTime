import { calendar_v3, google } from "googleapis";
import oAuth2Client from '../../firebase/oAuthConfig';
import { getCookie } from 'cookies-next';

const queryDbForTokens = require('../../methods/queryDbForTokens');

export default async function handler (req, res) {
  const email = req.query.email;
  const body = req.body;
  // console.log('BODY:       ', body);

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
    calendarId: 'primary',
    resource: body,
  });
}