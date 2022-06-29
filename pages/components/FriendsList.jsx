import React, { useState } from 'react';
import FriendCard from './FriendCard';
import { Box, Input } from '@chakra-ui/react';

const FriendsList = ({ friends, setFriends, findMutualTime }) => {
  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const friendElements = friends
    .filter(
      (friend) =>
        friend.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    )
    .map((friend, i) => {
      return (
        <FriendCard
          key={i}
          name={friend.name}
          location={friend.location}
          email={friend.email}
          fullEmail={friend.fullEmail}
          findMutualTime={findMutualTime}
          setFriends={setFriends}
          isInvited={friend.isInvited}
        />
      );
    });

  return (
    <>
      <Input
        placeholder="Find someone you know"
        mb="1rem"
        value={searchText}
        onChange={handleChange}
      />
      <Box overflowY="scroll" h="720px" pr="14px">
        {friendElements}
      </Box>
    </>
  );
};

export default FriendsList;
