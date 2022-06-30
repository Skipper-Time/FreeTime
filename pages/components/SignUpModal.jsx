import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  Center,
  Input,
  Flex,
  Image,
  Link,
} from '@chakra-ui/react';

import { useRouter } from 'next/router'

import { setCookies } from 'cookies-next';
import { useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import {provider, auth, db} from '../../firebase/firebaseConfig.js';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';


const SignUpModal = ({ isSignupOpen, onSignupClose }) => {
  const router = useRouter();
  const [signupOrLogin, setSignupOrLogin] = useState(null);

  const googleLogin = useGoogleLogin({
    scope: 'https://www.googleapis.com/auth/calendar',
    onSuccess: async ({ code }) => {
      try {
        const tokens = await axios.post('/api/auth/google', { code });

        const refreshToken = tokens.data.refresh_token;
        const accessToken = tokens.data.access_token;
        const idToken = tokens.data.id_token;

        setCookies('refreshToken', refreshToken);
        setCookies('accessToken', accessToken);

        const credential = await GoogleAuthProvider.credential(idToken);
        const user = await signInWithCredential(auth, credential);

        const userRef = doc(db, 'user_cal_data', user.user.email);
        // ADD freetime calendar here using their email and access token
        const headers = {
          'Authorization': 'Bearer ' + accessToken,
        }

        const addCalUrl = `https://www.googleapis.com/calendar/v3/calendars`;
        const addCalBody = { summary: 'freetime' }

        axios.post(addCalUrl, addCalBody, { headers: headers })
          .then(res => {
            console.log('THIS IS RESULT OF POST', res.data)

          })
          .catch(err => console.log("nice try....", err));

        // TODO check if the account exists
        // this is a problem because on line 41 a token is automatically
        // updated in the Db, so an account 'will exist'
        //
        // Somehow there needs to be logic to address this case
        //
        // Possible solution is have separate table for user email => tokens
        // and an actual registered users database

        router.push('/calendar');

      } catch (error) {
        console.log(error);
      }
    },
    flow: 'auth-code',
  });

  return (
    <Modal isOpen={isSignupOpen} onClose={onSignupClose}>
      <ModalOverlay />
      <ModalContent bg="#D9D9D9" borderRadius="16px" p="3rem 1rem">
        <ModalHeader>
          <Center fontSize="3xl"> Create account </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalFooter justifyContent="center">
          <Flex flexDir="column" alignContent="center">
            <Center fontWeight="300" mb="0.5rem" fontSize="xs" textAlign="center">
              Google account is required in order to sync your Google Calendar
            </Center>
            <Button onClick={() => googleLogin()} mb="0.5rem" w="fit-content" alignSelf="center">
              <Image src="./google-logo.png" alt="" width="24px" mr="0.5rem" />
              <Text>Sign in with Google</Text>
            </Button>
            <Text fontWeight="300" textAlign="center" fontSize="xs">
              By clicking Sign up, you agree to our{' '}
              <Link
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                target="_blank"
              >
                Terms, Data Policy and Cookies Policy
              </Link>
            </Text>

          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default SignUpModal;
