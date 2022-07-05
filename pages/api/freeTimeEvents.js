import tokenizeClient from '../../firebase/tokenizeClient';
import queryDbForFreeTimeEmail from '../../methods/queryDbForFreeTimeEmail';

/*
 * URL: /api/freeTimeEvents
 * QUERY: email
 *
 * EXAMPLE: /api/freeTimeEvents?email=user@gmail.com
 *
 * BODY: None
 *
 */
export default async function handler(req, res) {
  const email = req.query.email;
  const calendar = await tokenizeClient(email);
  const freeTimeEmail = await queryDbForFreeTimeEmail(email);
  const result = await calendar.events.list({
    calendarId: freeTimeEmail,
  });
  res.status(200).json(result.data.items);
}
