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
import { auth, db } from '../firebase/firebaseConfig';
import {
  collection,
  where,
  query,
  getDoc,
  getDocs,
  doc,
} from 'firebase/firestore';
import InvitedFriends from './components/InvitedFriends';
import NewEventModal from './components/NewEventModal';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [events, setEvents] = useState([]);
  const btnRef = useRef();
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [eventInfo, setEventInfo] = useState({});
  const findMutualTime = (email) => {
    axios
      .get(`api/freeBusy?email=${email}`)
      .then((response) => {
        const result = response.data.data.calendars[email].busy;
        const newResult = [...result];
        setEvents((prevEvents) => {
          return [
            ...prevEvents,
            ...newResult.map((event) => ({
              ...event,
              title: '~FREE~ 🫡',
              backgroundColor: '#723D46',
              color: 'black',
            })),
          ];
        });
      })
      .catch((error) => {
        console.log('could not access events for calendar', error);
      });
  };

  const {
    isOpen: isEventOpen,
    onOpen: onEventOpen,
    onClose: onEventClose,
  } = useDisclosure();

  useEffect(() => {
    const loadInitialEvents = async () => {
      const auth = await getAuth();
      while (auth === null) {
        auth = await getAuth();
      }
      const user = auth.currentUser;
      if (user !== null) {
        axios
          .get(`api/freeBusy?email=${user.email}`)
          .then((response) => {
            const result = response.data.data.calendars[user.email].busy;
            const newResult = [...result];
            setEvents(
              newResult.map((event) => ({
                ...event,
                title: '~FREE~ 🫡',
                backgroundColor: '#723D46',
                color: 'black',
              }))
            );

            const docRef = doc(db, 'user_cal_data', user.email);

            return getDoc(docRef);
          })
          .then(async (data) => {
            const userData = data.data();
            const currFriends = userData.friends;
            setFriends(
              await Promise.all(
                currFriends.map(async (email) => {
                  const docRef = doc(db, 'user_cal_data', email);
                  const friendQuery = await getDoc(docRef);
                  const friendData = friendQuery.data();

                  console.log('friendData', friendData);

                  return {
                    name: friendData.displayName,
                    email: email.split('@')[0],
                    fullEmail: email,
                    location: friendData.location,
                    isInvited: false,
                  };
                })
              )
            );
          })
          .then(() => {
            const docRef = collection(db, 'user_cal_data');
            return getDocs(docRef);
          })
          .then((userDocs) => {
            const everyUser = [];
            userDocs.forEach((doc) => {
              if (user.email !== doc.id) {
                const data = doc.data();
                everyUser.push({
                  email: doc.id,
                  name: data.displayName || doc.id,
                });
              }
              setAllUsers(everyUser);
              // console.log('userDoc', doc.data())
            });
            console.log('allUSERS', everyUser);
            // console.log('USERDOC', userDocs.docs)
          })
          .catch((error) => {
            console.log('could not access events for calendar', error);
          });
      }
    };
    loadInitialEvents();
  }, []);

  return (
    <>
      <NewEventModal
        events={events}
        isEventOpen={isEventOpen}
        onEventClose={onEventClose}
        eventInfo={eventInfo}
        friends={friends}
      />
      <FriendsDrawer
        btnRef={btnRef}
        isOpen={isOpen}
        onClose={onClose}
        friends={friends}
        setFriends={setFriends}
        findMutualTime={findMutualTime}
        allUsers={allUsers}
      />
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
          w="1200px"
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
          <InvitedFriends friends={friends} />
          <Box>
            {events.length !== 0 && (
              <Calendar
                events={events}
                friends={friends}
                onEventOpen={onEventOpen}
                eventInfo={eventInfo}
                setEventInfo={setEventInfo}
              />
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}
