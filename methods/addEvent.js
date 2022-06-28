export const addEvent = (token, userEmail, calData) => {
  console.log(calData, token);
  const { summary, description, location, colorId, start, end } = calData;

  let url = `https://www.googleapis.com/calendar/v3/calendars/${userEmail}/events`;

  let headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }

  fetch(url, {
    headers: headers,
    body: JSON.stringify(calData),
    method: 'POST'
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
}