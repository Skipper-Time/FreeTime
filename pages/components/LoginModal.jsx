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

const LoginModal = ({ isLoginOpen, onLoginClose }) => (
  <Modal isOpen={isLoginOpen} onClose={onLoginClose}>
    <ModalOverlay />
    <ModalContent bg="#D9D9D9" borderRadius="16px" p="3rem 1rem">
      <ModalHeader>
        <Center fontSize="3xl"> Log in </Center>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Flex flexDir="column" gap="1rem">
          <Input
            placeholder="Email"
            bg="#F6F3F3"
            // borderColor="black"
            // _hover={{ borderColor: 'gray.500' }}
            // borderRadius="full"
            // pl="2rem"
            // pr="2rem"
          />
          <Input
            placeholder="Password"
            bg="#F6F3F3"
            // borderColor="black"
            // _hover={{ borderColor: 'gray.500' }}
            // borderRadius="full"
            // pl="2rem"
            // pr="2rem"
          />
          <Button
            // bg="#E26D5C"
            // _hover={{ backgroundColor: '#e0503d' }}
            colorScheme="orange"
            color="white"
            // borderColor="black"
            borderWidth="1px"
            alignSelf="center"
            onClick={onLoginClose}
            // borderRadius="full"
            // width="100%"
          >
            Log in
          </Button>
        </Flex>
      </ModalBody>
      <ModalFooter justifyContent="center">
        <Flex flexDir="column" alignContent="center">
          <Center fontWeight="600" mb="0.5rem" fontSize="xl">
            or
          </Center>
          <Button>
            <Image src="./google-logo.png" alt="" width="24px" mr="0.5rem" />
            <Text>Sign in with Google</Text>
          </Button>
        </Flex>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

export default LoginModal;
