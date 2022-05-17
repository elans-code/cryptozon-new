import React, { useEffect, useState } from 'react'
import {Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, Input} from '@chakra-ui/react'
import { setConfig } from 'next/config';

export default function PostModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {data, open, closeFunc, addPost} = props;
    const [currentInput, setCurrentInput] = useState('');
    const [hasImg, setImg] = useState(false);
    cons [imgUrl, setImgUrl] = useState('')
    //needs to reference current userID
    const userId = 1
    useEffect(()=>{
        if(open){
            onOpen()
        }else{
            setCurrentInput('')
            onClose()
        }
    },[open])
    const add = (userId, Post) => {
        addPost(userId,Post)
        setCurrentInput('')
    }
    const handleFile = (e)=>{
        const file = e.target.files[0];
        setImgUrl(uploadImage(file))
        setImg(true);

    }
    console.log(data)
    return (
        <div>
            <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={closeFunc}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexDirection='column'>
                        <Input type='text' onChange={(e)=>setCurrentInput(e.nativeEvent.target.value)} placeholder={"What's on your mind?"} value={currentInput}/>
                        <Button variant='ghost' value='' onClick={()=>document.getElementById('upload').click()}>Upload Image</Button>
                        <Input id='upload' display='none' type='file' accept='image/*' onChange={()=>{}}/>

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={closeFunc}>
                        Close
                        </Button>
                        <Button variant='ghost' value='' onClick={()=>add(data.id,currentInput)}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}