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
import CalTest from './components/CalTest';
import Notifications from './components/Notifications';

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
        <Box>
          <Notifications />
          <Button bg="#D9D9D9">Log out</Button>
        </Box>
      </Flex>
      <Box p="1rem 3rem 3rem 3rem" bg="#F6F3F3" w="100vw">
        <Box w="800px" m="auto">
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen} mb="1rem">
            Find Friends
          </Button>
          <CalTest />
        </Box>
      </Box>
    </>
  );
}
