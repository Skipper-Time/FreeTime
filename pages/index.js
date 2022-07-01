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
import LoginModal from '../components/LoginModal';
import SignUpModal from '../components/SignUpModal';
import FullCalendar from '@fullcalendar/react'; // keep these in this order!!
import interactionPlugin from '@fullcalendar/interaction'; // keep these in this order!!
import timeGridPlugin from '@fullcalendar/timegrid'; // keep these in this order!!

export default function Home() {
  const {
    isOpen: isSignupOpen,
    onOpen: onSignupOpen,
    onClose: onSignupClose,
  } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();

  return (
    <>
      <SignUpModal isSignupOpen={isSignupOpen} onSignupClose={onSignupClose} />
      <LoginModal isLoginOpen={isLoginOpen} onLoginClose={onLoginClose} />
      <Box p="1rem" bg="#F6F3F3" w="100vw" h="100vh">
        {/* login and sign up buttons */}
        <Flex justify="flex-end" gap="1rem" mb="10rem" w="100%">
          <Button bg="transparent" onClick={onLoginOpen}>
            Login
          </Button>
          <Button bg="#C9CBA3" onClick={onSignupOpen}>
            Sign Up
          </Button>
        </Flex>
        <Center>
          <Flex gap="2rem" alignItems="center" wrap="wrap">
            <Flex flexDir="column" w="264px">
              <Text as="b" fontSize="5xl">
                Free{'\n'}Time
              </Text>
              <Text fontSize="2xl" mb="1rem" lineHeight="7">
                share your calendar {'&'} find a time to meet
              </Text>
              <Text fontSize="xl"> ✔️ sync up w/ friends </Text>
              <Text fontSize="xl"> ✔️ plan events </Text>
              <Text fontSize="xl"> ✔️ no schedule conflicts </Text>
              <Text fontSize="xl"> ✔️ easy sign up </Text>
              <Text fontSize="xl"> ✔️️ no hassle </Text>
            </Flex>
            {/* Image */}
            <Box w="480px" h="360px" pos="relative">
              <Box
                rounded="md"
                bg="#828371"
                w="480px"
                h="360px"
                pos="absolute"
                top="2rem"
                left="2rem"
                borderRadius="32px"
              >
                {' '}
              </Box>
              <Image
                src="/landing-calendar.png"
                alt=""
                borderRadius="32px"
                w="480px"
                h="360px"
                objectFit="cover"
                pos="absolute"
                style={{ zIndex: 100 }}
              />
            </Box>
          </Flex>
        </Center>
      </Box>
    </>
  );
}
