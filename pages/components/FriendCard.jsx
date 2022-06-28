import React from 'react';
import { Flex, Box, Image, Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const FriendCard = () => {
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
        >
          <AddIcon m="auto" />
        </Flex>
        <Text as="b" alignSelf="start">
          John Doe
        </Text>
        <Text alignSelf="start">@johndoe</Text>
        <Text alignSelf="start" as="i">
          Los Angeles, CA
        </Text>
      </Flex>
    </Flex>
  );
};

export default FriendCard;
