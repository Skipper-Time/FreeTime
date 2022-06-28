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
import {signupOrLogin} from '../../methods/signupOrLogin';
import { useRouter } from 'next/router'

const SignUpModal = ({ isSignupOpen, onSignupClose }) => {
  const router = useRouter();
  return (
    <Modal isOpen={isSignupOpen} onClose={onSignupClose}>
      <ModalOverlay />
      <ModalContent bg="#D9D9D9" borderRadius="16px" p="3rem 1rem">
        <ModalHeader>
          <Center fontSize="3xl"> Create account </Center>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" gap="1rem">
            <Input
              placeholder="First & Last Name"
              bg="#F6F3F3"
              // borderColor="black"
              // _hover={{ borderColor: 'gray.500' }}
              // borderRadius="full"
              // pl="2rem"
              // pr="2rem"
            />
            <Input
              placeholder="Username"
              bg="#F6F3F3"
              // borderColor="black"
              // _hover={{ borderColor: 'gray.500' }}
              // borderRadius="full"
              // pl="2rem"
              // pr="2rem"
            />
            <Input
              placeholder="Password"
              type="password"
              bg="#F6F3F3"
              // borderColor="black"
              // _hover={{ borderColor: 'gray.500' }}
              // borderRadius="full"
              // pl="2rem"
              // pr="2rem"
            />
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Flex flexDir="column" alignContent="center">
            <Center fontWeight="300" mb="0.5rem" fontSize="xs" textAlign="center">
              Google account is required in order to sync your Google Calendar
            </Center>
            <Button
              mb="0.5rem"
              w="fit-content"
              alignSelf="center"
              onClick={() => {
                signupOrLogin('signup')
                  .then((result) => {
                    if (result) {
                      router.push('/calendar');
                    }
                });
              }}
            >
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

            <Button
              // bg="#E26D5C"
              // _hover={{ backgroundColor: '#e0503d' }}
              colorScheme="orange"
              color="white"
              // borderColor="black"
              borderWidth="1px"
              alignSelf="center"
              onClick={onSignupClose}
              mt="1rem"
              // borderRadius="full"
              // width="100%"
            >
              Sign up
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SignUpModal;
