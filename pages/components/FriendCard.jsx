import React from 'react';
import { Flex, Box, Image, Text } from '@chakra-ui/react';

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
        <Text pos="absolute" top="4px" right="12px">
          ...
        </Text>
        <Text as="b" alignSelf="start">
          John Doe
        </Text>
        <Text alignSelf="start">@johndoe</Text>
        <Text alignSelf="end">Los Angeles, CA</Text>
      </Flex>
    </Flex>
  );
};

export default FriendCard;
