import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {
  Button,
  Flex,
  Image,
  Text,
  Box,
  Center,
  useDisclosure,
} from '@chakra-ui/react';
import LoginModal from './components/LoginModal';
import SignUpModal from './components/SignUpModal';
import FriendsDrawer from './components/FriendsDrawer';
import { useRef } from 'react';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <FriendsDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex
        bg="#C9CBA3"
        justify="space-between"
        gap="1rem"
        w="100%"
        p="0.5rem 2rem"
        alignItems="center"
      >
        <Text as="b" fontSize="3xl">
          Free Time
        </Text>
        <Button bg="#D9D9D9">Log out</Button>
      </Flex>
      <Flex p="1rem" bg="#F6F3F3" w="100vw" h="100vh">
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          Friends List
        </Button>
      </Flex>
    </>
  );
}
