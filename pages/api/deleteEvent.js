import { getCookie } from 'cookies-next';
import axios from 'axios';

// axios.delete(`api/deleteEvent?eventId=eventId`) will lead to this file

export default async function handler(req, res) {
  const eventId = req.query.eventId;
  const token = getCookie('googleToken');

  axios.delete(`https://www.googleapis.com/calendar/v3/calendars/freetime
  /events/${eventId}`, {
    headers: {
      'Authorization': 'Bearer' + token,
      'Content-Type': 'application/json'
    }
  })
  // If successful, this method returns an empty response body.
  .then(() => res.status(200).send('successfully deleted'));






}
