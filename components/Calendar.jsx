import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import NewEventModal from './NewEventModal';
import { useState } from 'react';
import getFreeTime from '../methods/mergeDates';
import mergeFreeEvents from '../methods/mergeEvents';
import { auth, db } from '/firebase/firebaseConfig';
import {
  collection,
  where,
  query,
  getDoc,
  getDocs,
  doc,
} from 'firebase/firestore';

const Calendar = ({
  events,
  friends,
  onEventOpen,
  onDetailsOpen,
  eventInfo,
  setEventInfo,
  eventDetails,
  setEventDetails,
  bookedFreeTime,
}) => {
  console.log('booked free time', bookedFreeTime);
  const [displayEvents, setDisplayEvents] = useState([]);

  const calendarRef = useRef(null);

  const combineEvents = () => {
    const freeTimeDisplay = getFreeTime(events).map((event) => ({
      ...event,
      title: '~FREE~ 🫡',
      backgroundColor: '#8E9EEB',
      // color: 'black',
    }));

    const bookedTime = mergeFreeEvents(bookedFreeTime).map((event) => ({
      ...event,
      start: event.start.dateTime,
      end: event.end.dateTime,
      title: event.summary,
      backgroundColor: '#62a667',
    }));
    // console.log('BOOOOOOOOOKED TIME:', bookedTime);

    const finalDisplay = [...freeTimeDisplay, ...bookedTime];
    console.log('FINALDISPLAY', finalDisplay);
    return finalDisplay;
  };

  console.log('bookedFreeTime', bookedFreeTime);
  console.log(
    'mergeFreeEvents(bookedFreeTime)',
    mergeFreeEvents(bookedFreeTime)
  );
  return (
    <>
      <FullCalendar
        theme={true}
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        selectable
        slotMinTime="8:00:00"
        slotMaxTime="23:00:00"
        eventClick={async (arg) => {
          if (arg.event.title === '~FREE~ 🫡') {
            setEventInfo({
              title: arg.event.title,
              start: arg.event.start,
              end: arg.event.end,
            });
            onEventOpen();
          } else {
            // get attendees, host up here
            // get picture urls for organizer and attendees
            const freeEmails = arg.event._def.extendedProps.attendees;
            const attendees = [];
            if (freeEmails) {
              freeEmails.forEach(async (att) => {
                console.log('ATTENDEE ---------->', att.email);
                const qAtt = query(
                  collection(db, 'user_cal_data'),
                  where('freeTimeEmail', '==', att.email)
                );
                const qAttSnap = await getDocs(qAtt);
                qAttSnap.forEach((doc) => {
                  attendees.push(doc.data());
                });
              });
            }
            console.log('ATTENDEEEEES ARRAY: ', attendees);
            const hostReq = doc(
              db,
              'user_cal_data',
              arg.event._def.extendedProps.creator.email
            );
            const hostSnap = await getDoc(hostReq);
            const hostData = hostSnap.data();
            console.log('hostdata', hostData);

            const host = {
              displayName: hostData.displayName,
              profilePic: hostData.profilePic,
            };
            // const host = {
            //   displayName: arg.event._def.extendedProps.c,
            //   profilePic:
            // };
            setEventDetails({
              title: arg.event._def.extendedProps.summary,
              start: arg.event.start,
              end: arg.event.end,
              description: arg.event._def.extendedProps.description,
              attendees,
              host,
              location: arg.event._def.extendedProps.location,
            });
            setTimeout(onDetailsOpen, 400);
          }
          // alert(arg.event.title);
          // alert(arg.event.start);
        }}
        events={combineEvents()}
      />
    </>
  );
};

export default Calendar;
