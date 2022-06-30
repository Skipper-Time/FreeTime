import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import Moment from 'react-moment';
import { nanoid } from 'nanoid';

const allIntervals = [];
allIntervals.push(`12:00 AM`);
allIntervals.push(`12:30 AM`);
for (let i = 1; i <= 11; i++) {
  allIntervals.push(`${i}:00 AM`);
  allIntervals.push(`${i}:30 AM`);
}
allIntervals.push(`12:00 PM`);
allIntervals.push(`12:30 PM`);
for (let i = 1; i <= 11; i++) {
  allIntervals.push(`${i}:00 PM`);
  allIntervals.push(`${i}:30 PM`);
}

const NewEventModal = ({ isEventOpen, onEventClose, events, eventInfo }) => {
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [location, setSelectedLocation] = useState('');
  const [selectedStart, setSelectedStart] = useState('12:00 PM');
  const [selectedEnd, setSelectedEnd] = useState('12:00 PM');

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
      `${eventInfo.start.getMonth() + 1} ${eventInfo.start.getDate()}, ${
        eventInfo.start.getYear() + 1900
      } ${dateStr} GMT-7:00`
    );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    switch (name) {
      case 'name':
        setName(val);
        break;
      case 'details':
        setDetails(val);
        break;
      case 'location':
        setSelectedLocation(val);
        break;
      case 'start':
        setSelectedStart(val);
        break;
      case 'end':
        setSelectedEnd(val);
        break;
    }
  };

  const handleSubmit = () => {
    console.log(convertDate(selectedStart));
  };
  return (
    // Need to render only for created events not for busy events.
    // The fact that this needs to happen scares and confuses me...
    // But it is okay :).
    <Modal isOpen={isEventOpen} onClose={onEventClose}>
      {console.log('INFO', eventInfo)}
      {console.log('EVENT', events)}
      <ModalOverlay />
      <ModalContent bg="white" borderRadius="16px" p="3rem 1rem">
        <ModalHeader>
          <Center fontSize="xl"> Event Info </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="1rem">
            <FormControl variant="floating">
              <Input
                name="name"
                placeholder=" "
                onChange={handleChange}
                value={name}
              />
              <FormLabel>Event Name</FormLabel>
            </FormControl>
            <FormControl variant="floating">
              <Input
                name="location"
                placeholder=" "
                onChange={handleChange}
                value={location}
              />
              <FormLabel>Location</FormLabel>
            </FormControl>
            <FormControl variant="floating">
              <Input name="att" placeholder=" " />
              <FormLabel>Attendees</FormLabel>
            </FormControl>
            <FormControl variant="floating">
              <Textarea
                name="details"
                placeholder=" "
                onChange={handleChange}
                value={details}
              />
              <FormLabel>Details</FormLabel>
            </FormControl>
            <Flex gap="1rem">
              <FormControl variant="floating">
                <Select
                  name="start"
                  value={selectedStart}
                  onChange={handleChange}
                >
                  {startElements}
                </Select>
                <FormLabel>Start Time</FormLabel>
              </FormControl>
              <FormControl variant="floating">
                <Select name="end" value={selectedEnd} onChange={handleChange}>
                  {endElements}
                </Select>
                <FormLabel>End Time</FormLabel>
              </FormControl>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Flex flexDir="row" alignContent="center" gap="1rem">
            <Button variant="outline" colorScheme="red" onClick={onEventClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleSubmit}>
              Submit
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewEventModal;
