import { getCookie, getCookies } from 'cookies-next';
import { useState } from 'react';

export default function ApiButtons() {
  const [calendars, setCalendars] = useState(null);
  // access the token from the cookie 'googleToken'
  // this is probably a temporary solution to storing the token
  const token = getCookie('googleToken');

  const getCalendarList = (token) => {
    let url = 'https://www.googleapis.com/calendar/v3/users/me/calendarList';
    // attach the token from the cookie to the authorization header
    let headers = {
      'Authorization': 'Bearer ' + token,
    }

    fetch(url, {headers: headers})
      .then(res => res.json())
      .then(json => { console.log(JSON.stringify(json, null, 4)); return setCalendars(json)})
      .catch(error => console.log(error))
  }


  const getFreeBusyForWeek = (token) => {
    // TODO implement day, week, month durations
    let url = 'https://www.googleapis.com/calendar/v3/freeBusy';
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // get the date a week from now
    let nextWeek  = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
    let timeMin = today.toISOString();
    let timeMax = nextWeek.toISOString();

    let body = {
      timeMin,
      timeMax,
      // need to handle user time zone but for now west coast = best coast
      timeZone: 'PST',
      items: calendars.items,
    }

    let headers = {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    }

    fetch(url, {headers: headers, body: JSON.stringify(body), method: 'POST'})
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json, null, 4)))
      .catch(error => console.log(error))
  }

  const addCalendar = (token, addCalData) => {
    const { summary, description, location, colorId, start, end } = addCalData;

    calendar.events.insert({
      auth: token,
      calendarId: 'primary',
      requestBody: {
        summary,
        description,
        location,
        colorId,
        start,
        end,
      }
    })
  }

/*
 * TODO
 * We need to get refresh tokens for the user. It's hard to get a clear
 * answer from the documentation on this. We might be given on one-time-only
 * when the user signs up, otherwise we might need to write a server
 * and integrate googleapis, which will need to be integrated with firebase
 *
 *
 * Other API calls to implement
 *
 * addEventToCalendar
 *
 * deleteEventFromCalendar
 *
 * updateCalendar
*/


  return (
    <div>
      <button onClick={() => getCalendarList(token)}>get calendars</button>
      <div></div>
      <button onClick={() => getFreeBusyForWeek(token)}>get free busy (get calendars first)</button>
    </div>
    )
  }
