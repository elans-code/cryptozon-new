import React, {useState, useRef} from "react";
import { Button, Modal, Image, ModalOverlay, ModalFooter, ModalHeader, ModalCloseButton, ModalBody, ModalContent, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { useDisclosure } from '@chakra-ui/react'
import { editUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

export default function EditProfile({user, wallet, usernames}) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();
  const [isError, setIsError] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: '',
    imageUrl: '',
    bio: ''
  })

  const {username, bio, imageUrl} = userInfo;

  function handleSubmit(wallet, userInfo) {
    dispatch(editUser({wallet, userInfo}))
    onClose()
  }

  function open() {
    setUserInfo({
      username: user.username,
      imageUrl: user.imageUrl,
      bio: user.bio
    })
    setIsError(false)
    onOpen()
  }

  function handleFileChange(e) {
    const fileInput = e.target.files[0];
    setUserInfo({...userInfo, imageUrl: URL.createObjectURL(fileInput)})
  }

  // onChange to check if username exists
  function checkUsername(e) {
    setUserInfo({...userInfo, username: e.target.value})
    if (usernames.includes(e.target.value)) {
      setIsError(true)
    } else {
      setIsError(false)
    }
  }

  return (
    <>
      <Button mt={4} onClick={open} w={120} >
        Edit Profile
      </Button>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image alt="profile" src={imageUrl} w={100} h={100} borderRadius={100} mb={5} cursor='pointer' onClick={() => document.getElementById('upload').click()}/>
            {/* <Input type='file' w={200} accept='image/*' onChange={(e) => setUserInfo({...userInfo, imageUrl: e.target.files[0]})}/> */}
            <Input id='upload' display='none' type='file' accept='image/*' onChange={handleFileChange}/>
            <FormControl>
              <FormLabel>Username</FormLabel>
              {/* <Input value={username} onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/> */}
              <Input value={username} onChange={checkUsername}/>
              {isError && username === '' ?
              <Text color='#ff4d4d'>Username cannot be empty!</Text> : isError ?
              <Text color='#ff4d4d'>This username is taken!</Text> : null
              }
            </FormControl>
            <FormControl mt={5}>
              <FormLabel>Bio</FormLabel>
              <Input value={bio} onChange={(e) => setUserInfo({...userInfo, bio: e.target.value})}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme='blue' mr={3} onClick={onClose}> */}
            <Button disabled={isError} colorScheme='blue' mr={3} onClick={() => handleSubmit(wallet, userInfo)}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
