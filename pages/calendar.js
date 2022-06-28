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
import Link from 'next/link';

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <>
      <FriendsDrawer btnRef={btnRef} isOpen={isOpen} onClose={onClose} />
      <Flex
        bg="#E26D5C"
        justify="space-between"
        gap="1rem"
        w="100%"
        p="0.5rem 2rem"
        alignItems="center"
      >
        <Text as="b" fontSize="3xl" color="#f6f3f3">
          ⌛ Free Time
        </Text>
        <Box>
          <Notifications />
          <Link href="/">
            <Button colorScheme="whiteAlpha">Log out</Button>
          </Link>
        </Box>
      </Flex>
      <Flex justify="center" bg="#f6f3f3">
        <Box
          p="3rem 3rem 3rem 3rem"
          bg="white"
          w="800px"
          mt="4rem"
          borderRadius="12px"
          style={{ filter: 'drop-shadow(10px 10px 10px rgba(0,0,0,0.2))' }}
        >
          <Button
            ref={btnRef}
            onClick={onOpen}
            mb="1rem"
            bg="#E26D5C"
            color="#f6f3f3"
          >
            Find Friends
          </Button>
          <Box>
            <CalTest />
          </Box>
        </Box>
      </Flex>
    </>
  );
}
