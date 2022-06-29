import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import FriendsDrawer from './components/FriendsDrawer';
import { useRef, useEffect, useState } from 'react';
import Calendar from './components/Calendar';
import Notifications from './components/Notifications';
import Link from 'next/link';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { auth } from '../firebase/firebaseConfig';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const btnRef = useRef();
  const [userData, setUserData] = useState({
    displayName: 'Jessica Zhou',
    email: 'jessicazhou541@gmail.com',
    // profilePic: user.photoURL
  });
  const [friends, setFriends] = useState([
    'deitchdustin@gmail.com',
    'hangyin2010@gmail.com',
  ]);

  // const user = auth.currentUser;
  // if (user !== null) {
  //   setUserData({
  //     displayName: user.displayName,
  //     email: user.email,
  //     profilePic: user.photoURL
  //   })
  // }
  const findMutualTime = (email) => {
    axios
      .get(`api/freeBusy?email=${email}`)
      .then((response) => {
        const result = response.data.data.calendars[email].busy;
        // console.log('result', result)
        const newResult = [...result];
        // console.log('newResult', newResult)
        setEvents((prevEvents) => {
          // NOTE: this is layering events, not merging
          return [
            ...prevEvents,
            ...newResult.map((event) => ({
              ...event,
              title: 'BUSY',
              backgroundColor: 'rgba(0,0,0)',
              color: 'black',
            })),
          ];
        });
      })
      .catch((error) => {
        console.log('could not access events for calendar', error);
      });
  };

  useEffect(() => {
    axios
      .get(`api/freeBusy?email=${userData.email}`)
      .then((response) => {
        const result = response.data.data.calendars[userData.email].busy;
        // console.log('result', result)
        const newResult = [...result];
        // console.log('newResult', newResult)
        setEvents(
          newResult.map((event) => ({
            ...event,
            title: 'BUSY',
            backgroundColor: 'rgba(0,0,0)',
            color: 'black',
          }))
        );
      })
      .catch((error) => {
        console.log('could not access events for calendar', error);
      });
  }, [userData.email]);

  return (
    <>
      <FriendsDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex
        bg="#E26D5C"
        justify="space-between"
        gap="1rem"
        w="100%"
        p="0.5rem 2rem"
        alignItems="center"
      >
        <Text as="b" fontSize="3xl" color="#f6f3f3">
          ⌛ Free Time
        </Text>
        <Box>
          <Notifications />
          <Link href="/">
            <Button colorScheme="whiteAlpha">Log out</Button>
          </Link>
        </Box>
      </Flex>
      <Flex justify="center" bg="#f6f3f3">
        <Box
          p="3rem 3rem 3rem 3rem"
          bg="white"
          w="800px"
          mt="4rem"
          borderRadius="12px"
          style={{ filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,0.2))' }}
        >
          <Button
            ref={btnRef}
            onClick={onOpen}
            mb="1rem"
            bg="#E26D5C"
            color="#f6f3f3"
          >
            Find Friends
          </Button>
          <Box>{events.length !== 0 && <Calendar events={events} />}</Box>
        </Box>
      </Flex>
    </>
  );
}
