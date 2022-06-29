import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import EventModal from './EventModal'
import { useState } from 'react';

const Calendar = ({events}) => {
  // Modal functionality for EventModal
  const {
    isOpen: isEventOpen,
    onOpen: onEventOpen,
    onClose: onEventClose,
  } = useDisclosure();

  // Holds information for inside EventModal
  const [eventInfo, setEventInfo] = useState({})

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
    <>
    <FullCalendar
      theme={true}
      ref={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      selectable
      dateClick={handleDateClick}
      eventClick={(arg) => {
        setEventInfo(
          {
            title: arg.event.title,
            start: arg.event.start,
            end: arg.event.end
          })
        onEventOpen()
        // alert(arg.event.title);
        // alert(arg.event.start);
      }}
      events={events}
    />
    <EventModal
     events={events}
     isEventOpen={isEventOpen}
     onEventClose={onEventClose}
     eventInfo={eventInfo}/>
    </>
  );
};

export default Calendar;
