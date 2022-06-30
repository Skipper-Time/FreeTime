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
import { doc, setDoc, collection } from 'firebase/firestore';


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

        const locations = {
          'Aaron Bowers': 'Las Vegas, NV',
          'Andres Arango': 'San Fransisco, CA',
          'Jessica Zhou': 'Sierra Vista, AZ',
          'Dustin Deitch': 'Reno, NV',
          'Jordan Sweet': 'San Diego, CA',
          'Hang Yin': 'Seattle, WA'
        }

        const userInstance = collection(db, 'user_cal_data');
        setDoc(doc(db, 'user_cal_data', user.user.email), {
          friends: ['arangotang97@gmail.com', 'bowersaaronjames@gmail.com'],
          displayName: user.user.displayName,
          profilePic: user.user.photoURL,
          userId: user.user.uid,
          location: locations[user.user.displayName] || 'Los Angeles, CA'
        }, { merge: true });

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
              <Text>Sign up with Google</Text>
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
