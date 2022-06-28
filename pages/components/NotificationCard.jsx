import React from 'react';
import { Flex, Box, Image, Text, Button } from '@chakra-ui/react';

const NotificationCard = ({ noti }) => {
  const { title, description, start, end, invitee, attendees } = noti;

  return (
    <Flex
      borderWidth="1px"
      alignItems="center"
      p="1rem"
      borderRadius="12px"
      mb=".5rem"
    >
      <Image
        src="./google-logo.png"
        alt=""
        borderRadius="full"
        w="48px"
        h="48px"
        mr="0.5rem"
        border="1px solid"
        borderColor="gray.300"
      />
      <Flex pos="relative" flexDir="column" width="100%">
        <Text as="b" alignSelf="start" fontSize="sm">
          {title}
        </Text>
        <Text alignSelf="start" fontSize="sm" mb="6px">
          Invited by {invitee}
        </Text>
        <Text alignSelf="start" fontSize="sm"></Text>
        <Flex gap="0.4rem">
          <Button size="xs" colorScheme="teal">
            Accept
          </Button>
          <Button size="xs" colorScheme="red">
            Decline
          </Button>
          <Button size="xs" variant="outline" colorScheme="teal">
            Details
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NotificationCard;
