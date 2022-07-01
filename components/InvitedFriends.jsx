import React from 'react';
import { Flex, Button, Tooltip, Image } from '@chakra-ui/react';
import { nanoid } from 'nanoid';

const InvitedFriends = ({ friends }) => (
  <Flex gap="0.8rem" mb="1rem">
    {friends.length > 0 &&
      friends
        .filter((friend) => friend.isInvited === true)
        .map((friend) => (
          <Tooltip label={friend.name} fontSize="md" key={nanoid()}>
            <Image
              w="36px"
              h="36px"
              borderRadius="full"
              src={friend.profilePic}
              alt=""
            />
          </Tooltip>
          // <Button colorScheme="facebook" key={friend.name}>
          //   {friend.name}
          // </Button>
        ))}
  </Flex>
);

export default InvitedFriends;
