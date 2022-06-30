import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { useRef } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import NewEventModal from './NewEventModal';
import { useState } from 'react';

const Calendar = ({
  events,
  friends,
  onEventOpen,
  eventInfo,
  setEventInfo,
}) => {
  const calendarRef = useRef(null);

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
        events={events}
      />
    </>
  );
};

export default Calendar;
