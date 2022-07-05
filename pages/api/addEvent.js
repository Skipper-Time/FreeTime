import queryDbForFreeTimeEmail from '../../methods/queryDbForFreeTimeEmail.js';
import tokenizeClient from '../../firebase/tokenizeClient';

export default async function handler (req, res) {
  const email = req.query.email;
  const calendar = await tokenizeClient(email);
  const body = req.body;

  const calendarId = await queryDbForFreeTimeEmail(email);

  const event = await calendar.events.insert({
    auth: oAuth2Client,
    calendarId: calendarId,
    resource: body,
  });

  res.status(201).send('successfully added freetime event');
}
