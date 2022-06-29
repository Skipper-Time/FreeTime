import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef } from 'react';

const Calendar = ({events}) => {
  // console.log('events', events ? events : 'events is null')
  // console.log('EVENTS', events)
  // example data:
  //   [
  //     {
  //       title: 'event 1',
  //       start: '2022-06-28T12:30',
  //       end: '2022-06-28T14:30',
  //       backgroundColor: 'rgba(0,0,0,0.2)',
  //     },
  //     {
  //       title: 'Feature Freeze 🥶',
  //       start: '2022-06-29T17:30',
  //       end: '2022-06-29T18:30',
  //     },
  //   ]

  // console.log('events in Calendar', events)
  const calendarRef = useRef(null);

  // console.log(calendarRef);

  const handleDateClick = (arg) => {
    alert(arg.dateStr);
  };
  return (
    <FullCalendar
      theme={true}
      ref={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      selectable
      dateClick={handleDateClick}
      // eventClick={function (arg) {
      //   alert(arg.event.title);
      //   alert(arg.event.start);
      // }}
      events={events}
    />
  );
};

export default Calendar;
