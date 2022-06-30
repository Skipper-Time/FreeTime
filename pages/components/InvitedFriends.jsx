import React from 'react';
import { Flex, Button } from '@chakra-ui/react';

const InvitedFriends = ({ friends }) => (
  <Flex gap="0.8rem" mb="1rem">
    {friends.length > 0 &&
      friends
        .filter((friend) => friend.isInvited === true)
        .map((friend) => (
          <Button colorScheme="facebook" key={friend.name}>
            {friend.name}
          </Button>
        ))}
  </Flex>
);

export default InvitedFriends;
