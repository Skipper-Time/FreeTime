import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import FriendsList from './FriendsList';
import FindFriends from './FindFriends';

const FriendsDrawer = ({
  btnRef,
  isOpen,
  onClose,
  friends,
  setFriends,
  findMutualTime,
  allUsers,
  addNewFriend,
  removeFriend
}) => {
  const [currentView, setCurrentView] = useState('list');
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Tabs>
              <TabList>
                <Tab>Friends List</Tab>
                <Tab>Find Friends</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <FriendsList
                    friends={friends}
                    setFriends={setFriends}
                    findMutualTime={findMutualTime}
                    removeFriend={removeFriend}
                  />
                </TabPanel>
                <TabPanel>
                  <FindFriends
                  allUsers={allUsers}
                  addNewFriend={addNewFriend}
                   />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>
          <DrawerFooter justifyContent="center">
            <Button bg="#723D46" color="white" mb="1rem">
              Invite friends
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default FriendsDrawer;
