import React from 'react';
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
} from '@chakra-ui/react';
import Moment from 'react-moment';

const EventModal = ({ isEventOpen, onEventClose, events, eventInfo }) => (
  // Need to render only for created events not for busy events.
  // The fact that this needs to happen scares and confuses me...
  // But it is okay :).
  <Modal isOpen={isEventOpen} onClose={onEventClose}>
    {console.log('INFO', eventInfo)}
    {console.log('EVENT', events)}
    <ModalOverlay />
    <ModalContent bg="#FFFAFA" borderRadius="16px" p="3rem 1rem">
      <ModalHeader>
        <Center fontSize="xl"> Event Info </Center>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex flexDir="column">
         <div>Event Name: {'TITLE FROM API'} </div>
         <div>Location: {'LOCATION FROM API'} </div>
         <div>Attendees: {'ALL ATTENDEES FROM API'}</div>
         <div>Details: {'DETAILS FROM API'}</div>
         <div>Start Time: {' '}
           {'START TIME FROM API'}
         </div>
         <div>End Time: {' '}
           {'END TIME FROM API'}
          </div>
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent="center">
        <Flex flexDir="column" alignContent="center">
          <Center fontWeight="600" mb="0.5rem" fontSize="xl">
          </Center>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default EventModal;
