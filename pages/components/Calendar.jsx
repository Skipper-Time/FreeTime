import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import NewEventModal from './NewEventModal';
import { useState } from 'react';
import getFreeTime from '../../methods/mergeDates';
import mergeFreeEvents from '../../methods/mergeEvents';

const Calendar = ({
  events,
  friends,
  onEventOpen,
  eventInfo,
  setEventInfo,
  bookedFreeTime,
}) => {
  const [displayEvents, setDisplayEvents] = useState([]);

  const calendarRef = useRef(null);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };

  const combineEvents = () => {
    const freeTimeDisplay = getFreeTime(events).map((event) => ({
      ...event,
      title: '~FREE~ 🫡',
      backgroundColor: '#8E9EEB',
      color: 'black',
    }))

    const bookedTime = mergeFreeEvents(bookedFreeTime).map((event) => ({
      ...event,
      start: event.start.dateTime,
      end: event.end.dateTime,
      title: '~BOOKED ON FREETIME~ 🫡',
      backgroundColor: 'Orange',
      color: 'black',
    }))


    const finalDisplay = [...freeTimeDisplay, ...bookedTime]
    console.log('FINALDISPLAY', finalDisplay)
    return finalDisplay;
  }

  console.log('bookedFreeTime', bookedFreeTime)
  console.log('mergeFreeEvents(bookedFreeTime)', mergeFreeEvents(bookedFreeTime))
  return (
    <>
      <FullCalendar
        theme={true}
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        selectable
        slotMinTime="8:00:00"
        slotMaxTime="23:00:00"
        dateClick={handleDateClick}
        eventClick={(arg) => {
          setEventInfo({
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end,
          });
          onEventOpen();
          // alert(arg.event.title);
          // alert(arg.event.start);
        }}
        events={
          combineEvents()

          }
      />
    </>
  );
};

export default Calendar;

