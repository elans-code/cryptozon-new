import React, { useEffect, useState } from 'react'
import {Button, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure, Input} from '@chakra-ui/react'

export default function CommentModal(props) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const {data, open, closeFunc, addComment} = props;
    const [currentInput, setCurrentInput] = useState('');

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
    const add = (postId, userId, comment) => {
        addComment(postId,userId,comment)
        setCurrentInput('')
    }
    return (
        <div>
            <Modal blockScrollOnMount={true} isOpen={isOpen} onClose={closeFunc}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input onChange={(e)=>setCurrentInput(e.nativeEvent.target.value)} placeholder={"What's on your mind?"} value={currentInput}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={closeFunc}>
                        Close
                        </Button>
                        <Button variant='ghost' value='' onClick={()=>add(data.id,userId,currentInput)}>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
