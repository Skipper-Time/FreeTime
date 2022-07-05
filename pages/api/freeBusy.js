import tokenizeClient from '../../firebase/tokenizeClient';

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
  const email = req.query.email;
  const calendar = await tokenizeClient(email);

  let today = new Date();
  today.setHours(0, 0, 0, 0);
  let nextWeek  = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
  let timeMin = today.toISOString();
  let timeMax = nextWeek.toISOString();

  const calendarList = await calendar.calendarList.list();

  const freeBusy = await calendar.freebusy.query({
    requestBody: {
      timeMin: timeMin,
      timeMax: timeMax,
      timeZone: 'PST',
      items: calendarList.data.items
  }});

  res.status(200).json(freeBusy);
}
