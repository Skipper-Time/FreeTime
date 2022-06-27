import React from 'react';
import FriendCard from './FriendCard';
import { Box, Input } from '@chakra-ui/react';

const FriendsList = () => {
  return (
    <>
      <Input placeholder="Find someone you know" mb="1rem" />
      <Box overflowY="scroll" h="720px" pr="14px">
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
        <FriendCard />
      </Box>
    </>
  );
};

export default FriendsList;
