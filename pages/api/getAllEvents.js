// import { calendar_v3, google } from "googleapis";
// import oAuth2Client from '../../firebase/oAuthConfig';
// import { getCookie } from 'cookies-next';

// const queryDbForTokens = require('../../methods/queryDbForTokens');

// export default async function handler(req, res) {
//   const email = req.query.email;
//   const cal = 'FreeTime';

//   const tokens = await queryDbForTokens(email);
//   const refreshToken = tokens.refreshToken;
//   const accessToken = tokens.accessToken;

//   oAuth2Client.setCredentials({
//     refresh_token: refreshToken,
//     access_token: accessToken,
//   });

//   const calendar = google.calendar({
//       version: "v3",
//       auth: oAuth2Client,
//   });

//   const eventsList = await calendar.events.list({
//     auth: oAuth2Client,
//     calendarId: 'FreeTime',
//   });

//   // const freeBusy = await calendar.freebusy.query({
//   //   requestBody: {
//   //     timeMin: timeMin,
//   //     timeMax: timeMax,
//   //     timeZone: 'PST',
//   //     items: calendarList.data.items
//   // }});


//   // res.status(200).json(freeBusy);

// }
