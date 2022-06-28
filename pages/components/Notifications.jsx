import React, { useState } from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Box,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import NotificationCard from './NotificationCard';

const Notifications = () => {
  const [notis, setNotis] = useState([
    {
      title: 'Picnic at the park!!',
      description: "Who's Joe?",
      invitee: 'Joe Joe',
      attendees: ['Dustin', 'Andres', 'Donna'],
      start: '2022-06-29T17:30',
      end: '2022-06-29T18:30',
    },
    {
      title: 'Picnic at the park!!',
      description: "Who's Joe?",
      invitee: 'Joe MeeMee',
      attendees: ['Dustin', 'Andres', 'Donna'],
      start: '2022-06-29T17:30',
      end: '2022-06-29T18:30',
    },
    {
      title: 'Picnic at the park!!',
      description: "Who's Joe?",
      invitee: 'Joe-MooMoo',
      attendees: ['Dustin', 'Andres', 'Donna'],
      start: '2022-06-29T17:30',
      end: '2022-06-29T18:30',
    },
    {
      title: 'Picnic at the park!!',
      description: "Who's Joe?",
      invitee: 'Joe-Bama',
      attendees: ['Dustin', 'Andres', 'Donna'],
      start: '2022-06-29T17:30',
      end: '2022-06-29T18:30',
    },
  ]);

  const notiElements = notis.map((noti, i) => (
    <NotificationCard noti={noti} key={i} />
  ));

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          // bg="transparent"
          mr="1rem"
          pos="relative"
          // _hover={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          colorScheme="whiteAlpha"
        >
          <BellIcon boxSize="1.5rem" color="#f6f3f3" />
          {notis.length > 0 && (
            <Box
              bgColor="red"
              opacity="1"
              borderRadius="full"
              top="-8px"
              right="-6px"
              pos="absolute"
              p="4px 8px"
              color="white"
            >
              {notis.length}
            </Box>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Notifications</PopoverHeader>
        <PopoverBody>{notiElements}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
