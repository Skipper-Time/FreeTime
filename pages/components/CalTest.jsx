import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef, useState } from 'react';

const CalTest = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([
    {
      title: 'event 1',
      start: '2022-06-28T12:30',
      end: '2022-06-28T14:30',
    },
    {
      title: 'Feature Freeze 🥶',
      start: '2022-06-29T17:30',
      end: '2022-06-29T18:30',
    },
  ]);

  console.log(calendarRef);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      selectable
      dateClick={handleDateClick}
      eventClick={function (arg) {
        alert(arg.event.title);
        alert(arg.event.start);
      }}
      events={events}
    />
  );
};

export default CalTest;
