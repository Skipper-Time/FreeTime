// import { calendar_v3, google } from "googleapis";
// import oAuth2Client from '../../firebase/oAuthConfig';
// import { getCookie } from 'cookies-next';

// const queryDbForTokens = require('../../methods/queryDbForTokens');

// export default async function handler(req, res) {
//   const email = req.query.email;
//   const eventId = req.query.eventId;

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

//   const deleteEvent = await calendar.events.delete({
//     auth: oAuth2Client,
//     calendarId: 'FreeTime',
//     eventId: eventId
//   })

//   // res.status(200).json(freeBusy);

// }
