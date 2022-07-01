import React, {useState} from 'react';
import UserCard from './UserCard.jsx';
import { Box, Input } from '@chakra-ui/react';

const FindFriends = ({ allUsers, addNewFriend }) => {

  const [searchText, setSearchText] = useState('');

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  const friendElements = allUsers
  .filter(
    (friend) =>
      friend.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
  )
  .map((user, i) => {
    // console.log('user in card', user)
    console.log('user', user)
    return (
      <UserCard
        key={i}
        name={user.name}
        email={user.email}
        profilePic={user.profilePic}
        addNewFriend={addNewFriend}
      />
    );
  });

  return (
    <>
      <Input
        placeholder="Find someone new"
        mb="1rem"
        value={searchText}
        onChange={handleChange}/>
      <Box overflowY="scroll" h="720px" pr="14px">
        {friendElements}
      </Box>
    </>
  );
};

export default FindFriends;
