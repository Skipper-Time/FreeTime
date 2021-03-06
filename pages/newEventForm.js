import { useState } from 'react';
import { getCookie, getCookies } from 'cookies-next';
import emailExists from '../methods/emailExists.js';
import axios from 'axios';

export default function AddEvent () { // add userEmail as a prop
  let [summary, setSummary] = useState('');
  let [description, setDescription] = useState('');
  let [location, setLocation] = useState('');
  let [startDateTime, setStartDateTime] = useState('');
  let [endDateTime, setEndDateTime] = useState('');
  let [email, setEmail] = useState('');
  let [attendees, setAttendees] = useState([]);


  const Emails = () => {
    return (
      <>
        <ul>
          {attendees.map((attendee, id) => {
            return <li key={id}>{attendee.email}</li>;
          })}
        </ul>
      </>
    )
  }

  async function addEmail () {
    // let friendExists = await emailExists(email);
    // if (friendExists) {
      setAttendees([...attendees, { email }]);
      setEmail('');
    // } else {
    //   alert('This person must first sign up for FreeTime for you to invite them.')
    // }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //  console.log(summary, description, location, startDateTime, endDateTime);
    //  console.log('2022-06-27T16:40:00-07:00', new Date(startDateTime).toISOString());
    // console.log(attendees);

   let body = {
     summary,
     location,
     description,
     start: {
       dateTime: new Date(startDateTime).toISOString(),
     },
     end: {
       dateTime: new Date(endDateTime).toISOString(),
     },
     attendees,
   };

  //  console.log(body);
   const token = getCookie('googleToken');
   axios.post('/api/addEvent?email=bowersaaronjames@gmail.com', body);
 }

 return (
   <div>
     <form onSubmit={handleSubmit}>
       <label htmlFor='summary'>Summary</label>
       <br />
       <input
         type='text'
         id='summary'
         value={summary}
         onChange={e => setSummary(e.target.value)}
       />
       <br />
       <label htmlFor='description'>Description</label>
       <br />
       <textarea
         id='description'
         value={description}
         onChange={e => setDescription(e.target.value)}
       />
       <br />
       <label htmlFor='location'>Location</label>
       <br />
       <input
         type='text'
         id='location'
         value={location}
         onChange={e => setLocation(e.target.value)}
       />
       <br />
       <label htmlFor='emails'>Attendee Emails</label>
       <br />
       <input
         type='email'
         id='emails'
         value={email}
         onChange={e => setEmail(e.target.value)}
       />
       <button type='button' onClick={addEmail}>+</button>
       <br />
       <Emails />
       <br />
       <label htmlFor='startDateTime'>Start Date Time</label>
       <br />
       <input
         type='datetime-local'
         id='startDateTime'
         value={startDateTime}
         onChange={e => setStartDateTime(e.target.value)}
       />
       <br />
       <label htmlFor='endDateTime'>End Date Time</label>
       <br />
       <input
         type='datetime-local'
         id='endDateTime'
         value={endDateTime}
         onChange={e => setEndDateTime(e.target.value)}
       />
       <br />
       <button type='submit'>create event</button>
     </form>
   </div>
 )
}


