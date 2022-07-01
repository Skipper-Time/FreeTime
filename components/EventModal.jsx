import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Center,
  FormHelperText,
  Select,
  Textarea,
  Image,
  Tooltip,
} from '@chakra-ui/react';
import Moment from 'react-moment';
import { nanoid } from 'nanoid';
import InvitedFriends from './InvitedFriends';
import axios from 'axios';
import moment from 'moment';

const allIntervals = [];
// allIntervals.push(`12:00 AM`);
// allIntervals.push(`12:30 AM`);
for (let i = 8; i <= 11; i++) {
  allIntervals.push(`${i}:00 AM`);
  allIntervals.push(`${i}:30 AM`);
}
allIntervals.push(`12:00 PM`);
allIntervals.push(`12:30 PM`);
for (let i = 1; i <= 10; i++) {
  allIntervals.push(`${i}:00 PM`);
  allIntervals.push(`${i}:30 PM`);
}

const EventModal = ({
  isDetailsOpen,
  onDetailsClose,
  events,
  eventDetails,
  friends,
  findMutualTime,
  userEmail,
  freeTimeEmail,
}) => {
  // console.log('eventDetails tartfdasdfasdfhl', eventDetails.start);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [location, setSelectedLocation] = useState('');
  const [selectedStart, setSelectedStart] = useState('3:00 PM');
  const [selectedEnd, setSelectedEnd] = useState('3:00 PM');
  const attendeeEmails = friends
    .filter((friend) => {
      if (friend.isInvited) return friend;
    })
    .map((attendee) => {
      return { email: attendee.freeTimeEmail };
    });
  //  console.log("INVITED ATTENDEES", attendeeEmails)

  useEffect(() => {
    setSelectedEnd(selectedStart);
  }, [selectedStart]);

  // useEffect(() => {
  //   setSelectedEnd(selectedStart);
  // }, [selectedStart]);

  const startElements = allIntervals.map((interval) => (
    <option key={nanoid()} value={interval}>
      {interval}
    </option>
  ));

  const endElements = allIntervals.map((interval) => (
    <option key={nanoid()} value={interval}>
      {interval}
    </option>
  ));

  const convertDate = (dateStr) => {
    return new Date(
      `${eventDetails.start.getMonth() + 1} ${eventDetails.start.getDate()}, ${
        eventDetails.start.getYear() + 1900
      } ${dateStr} GMT-7:00`
    );
  };

  const startMinutes = new Date(eventDetails.start).getMinutes();
  const startHours = new Date(eventDetails.start).getHours();
  const startTime = `${startHours > 12 ? startHours - 12 : startHours}:${
    startMinutes === 0 ? '00' : startMinutes
  }${new Date(eventDetails.start).getHours() >= 12 ? 'pm' : 'am'}`;

  const endMinutes = new Date(eventDetails.end).getMinutes();
  const endHours = new Date(eventDetails.end).getHours();
  const endTime = `${endHours > 12 ? endHours - 12 : endHours}:${
    endMinutes === 0 ? '00' : endMinutes
  }${new Date(eventDetails.end).getHours() >= 12 ? 'pm' : 'am'}`;

  const dateRangeStr = `${moment(
    new Date(eventDetails.end).toLocaleDateString()
  ).format('MMMM Do')} ${startTime} - ${endTime}`;

  // const start = new Date(eventDetails.start);
  // const end = new Date(eventDetails.end);
  const attendeeElements = eventDetails.attendees.map((attendee) => {
    if (attendee.freeTimeEmail !== freeTimeEmail) {
      return (
        <Tooltip label={attendee.displayName} fontSize="md" key={nanoid()}>
          <Image
            w="36px"
            h="36px"
            borderRadius="full"
            src={attendee.profilePic}
            alt=""
          />
        </Tooltip>
      );
    } else {
      return <Text>Me</Text>;
    }
  });

  return (
    // Need to render only for created events not for busy events.
    // The fact that this needs to happen scares and confuses me...
    // But it is okay :).
    <Modal isOpen={isDetailsOpen} onClose={onDetailsClose}>
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="16px" p="3rem 1rem">
        <ModalHeader mb="-1rem">
          <Center fontSize="xl" mb="1rem">
            {eventDetails.title}
          </Center>
          {/* <InvitedFriends friends={friends} /> */}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="1rem">
            <Text as="i">{eventDetails.description}</Text>
            <Flex gap="0.5rem">
              <Text as="b">Start</Text>
              {eventDetails.start !== null && <Text>{dateRangeStr}</Text>}
            </Flex>
            <Flex gap="0.5rem">
              <Text as="b">Location</Text>
              <Text as="i">{eventDetails.location}</Text>
            </Flex>
            <Flex gap="0.5rem" alignItems="center">
              <Text as="b">Host</Text>
              {eventDetails.host.email !== userEmail ? (
                <Tooltip label={eventDetails.host.displayName} fontSize="md">
                  <Image
                    w="36px"
                    h="36px"
                    borderRadius="full"
                    src={eventDetails.host.profilePic}
                    alt=""
                  />
                </Tooltip>
              ) : (
                <Text>Me</Text>
              )}
            </Flex>
            <Flex gap="0.5rem" flexWrap="wrap" alignItems="center">
              <Text as="b">{`Who's going?`}</Text>
              {attendeeElements}
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
