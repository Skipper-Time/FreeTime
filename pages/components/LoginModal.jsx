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
  Input,
  FormControl,
  FormLabel,
  Flex,
  Center,
  Image,
} from '@chakra-ui/react';


import { useRouter } from 'next/router'
import emailExists from '../../methods/emailExists';
import { setCookies } from 'cookies-next';
import { useState } from 'react';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios';
import {provider, auth, db} from '../../firebase/firebaseConfig.js';
import { doc, setDoc, getDoc, collection } from 'firebase/firestore';


const LoginModal = ({ isLoginOpen, onLoginClose }) => {
  const router = useRouter();
  const [signupOrLogin, setSignupOrLogin] = useState(null);
  const [NoAccountFound, setNoAccountFound] = useState(false);

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

        router.push('/calendar');
        // TODO check if the account exists
        // this is a problem because on line 41 a token is automatically
        // updated in the Db, so an account 'will exist'
        //
        // Somehow there needs to be logic to address this case
        //
        // Possible solution is have separate table for user email => tokens
        // and an actual registered users database

      } catch (error) {
        console.log(error);
      }
    },
    flow: 'auth-code',
  });

  const NoAccountExists = (
    <ModalFooter>
      <Text fontWeight="300" textAlign="center" fontSize="xs">
        Account does not exist.
      </Text>
    </ModalFooter>
  )

  return (
    <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
      <ModalOverlay />
      <ModalContent bg="#D9D9D9" borderRadius="16px" p="3rem 1rem">
        <ModalCloseButton />
        <ModalBody justifyContent="center">
          <Flex flexDir="column" alignContent="center">
            <Button onClick={() => googleLogin()}>
              <Image src="./google-logo.png" alt="" width="24px" mr="0.5rem" />
              <Text>Sign in with Google</Text>
            </Button>
          </Flex>
        </ModalBody>
        { NoAccountFound ? <NoAccountExists /> : null }
      </ModalContent>
    </Modal>
  )
};

export default LoginModal;
