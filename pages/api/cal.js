import { calendar_v3, google } from "googleapis";
import { getCookie } from 'cookies-next';

import oAuth2Client from '../../firebase/oAuthConfig';


export default async function handler(req, res) {
  // need to get the tokens from the client after authing
//   const refreshToken = req.query.refreshToken;
// const accessToken = req.query.accessToken;
  const refreshToken = getCookie('refreshToken', {req, res});
  const accessToken = getCookie('accessToken', {req, res});

  // Set the credentials to the current person
  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
    access_token: accessToken,
  });

  // dummy data (would normally be body data, i guess)
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  // this is for one full week but it could be a month
  let nextWeek  = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
  let timeMin = today.toISOString();
  let timeMax = nextWeek.toISOString();

  // configure the calendar api thing
  const calendar = google.calendar({
      version: "v3",
      auth: oAuth2Client,
  });

  // do the google api call
  const events = await calendar.events.list({
          calendarId: "primary",
          timeMin,
          timeMax,
          singleEvents: true,
        });

  // send the info result back
  res.status(200).json(events);
}
