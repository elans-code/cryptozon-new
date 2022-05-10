import React from "react";
import { Box, Button, Modal, Image, ModalOverlay, ModalFooter, ModalHeader, ModalCloseButton, ModalBody, ModalContent, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { editUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

export default function EditProfile({userInfo, setUserInfo, wallet}) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const {username, bio, imageUrl} = userInfo;

  function handleSubmit(wallet, userInfo) {
    dispatch(editUser({wallet, userInfo}))
    onClose()
    // dispatch edit thunk
    // onClose()
  }

  return (
    <>
      <Button mt={4} onClick={onOpen} w={120} >
        Edit Profile
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image alt="profile" src={imageUrl} w={100} h={100} borderRadius={100} mb={5} />
            {/* <Input type='file' w={200} onChange={(e) => setUserInfo({...userInfo, imageUrl: e.target.value})}/> */}
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input value={username} onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/>
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Bio</FormLabel>
              <Input value={bio} onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}> */}
            <Button colorScheme='blue' mr={3} onClick={() => handleSubmit(wallet, userInfo)}>
              Save
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
