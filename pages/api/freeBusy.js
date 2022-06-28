import { calendar_v3, google } from "googleapis";
import oAuth2Client from '../../firebase/oAuthConfig';
import { getCookie } from 'cookies-next';


/*
 * URL: /api/freeBusy
 * QUERY: email
 *
 * EXAMPLE: /api/freeBusy?email=jordan@gmail.com
 *
 * BODY: None
 *
 * Returns raw json response of freebusy data
 */

export default async function handler(req, res) {
  const refreshToken = getCookie('refreshToken', {req, res});
  const accessToken = getCookie('accessToken', {req, res});

  // TODO Accept EMAIL as a query
  // TODO Fetch refresh token, access token from firebase Db
  // instead of from cookie

  // Set the credentials to the current person
  oAuth2Client.setCredentials({
    refresh_token: refreshToken,
    access_token: accessToken,
  });


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

  const calendarList = await calendar.calendarList.list();

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin,
      timeMax: timeMax,
      timeZone: 'PST',
      items: calendarList.data.items
  }});

  // send the info result back
  res.status(200).json(freeBusy);
}
