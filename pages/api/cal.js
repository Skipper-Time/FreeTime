const { OAuth2Client } = require('google-auth-library');
import { calendar_v3, google } from "googleapis";

// Create the oath client which handles token refreshing
const oAuth2Client = new OAuth2Client(
  process.env.clientId,
  process.env.clientSecret,
  'postmessage',
);


export default async function handler(req, res) {
  // need to get the tokens from the client after authing
  const refreshToken = req.query.refreshToken;
  const accessToken = req.query.accessToken;

  // set the tokens on the client
  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
    access_token: accessToken,
  });


  // configure the calendar api thing
  const calendar = google.calendar({
      version: "v3",
      auth: oAuth2Client,
  });


  // dummy data (would normally be query params, i guess)
  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let nextWeek  = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
  let timeMin = today.toISOString();
  let timeMax = nextWeek.toISOString();

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
