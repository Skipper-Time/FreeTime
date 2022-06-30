import React, { useState } from 'react';
import { Flex, Box, Image, Text } from '@chakra-ui/react';
import { AddIcon, CheckIcon } from '@chakra-ui/icons';

const UserCard = ({
  name,
  email,
  profilePic
}) => {
  const [isInvited, setIsInvited] = useState(false);

  const handleAdd = () => {
    if (!isInvited) {
      console.log('hello world')
    }
  };
  console.log('profile pic', profilePic)
  return (
    <Flex
      borderWidth="1px"
      alignItems="center"
      p="1rem"
      borderRadius="12px"
      mb=".5rem"
    >
      <Image
        src={profilePic  || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
        alt=""
        borderRadius="full"
        w="64px"
        h="64px"
        mr="0.5rem"
        border="1px solid"
        borderColor="gray.300"
      />
      <Flex pos="relative" flexDir="column" width="100%">
        <Text pos="absolute" bottom="0px" right="12px">
          ...
        </Text>
        <Flex
          pos="absolute"
          top="10%"
          right="6px"
          h="24px"
          w="24px"
          borderRadius="full"
          border="black 2px solid"
          alignContent="center"
          _hover={{ cursor: 'pointer' }}
          onClick={handleAdd}
        >
          {isInvited ? <CheckIcon m="auto" /> : <AddIcon m="auto" />}
        </Flex>
        <Text as="b" alignSelf="start">
          {name}
        </Text>
        <Text alignSelf="start">{`@${email}`}</Text>
      </Flex>
    </Flex>
  );
};

export default UserCard;
