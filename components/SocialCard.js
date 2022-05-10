import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Text, Image, Container, Flex, Boxider, useDisclosure, Spacer} from "@chakra-ui/react";
import { fetchAllPost, likeComment, likePost, commentPost } from '../store/post';
import CommentModal from './CommentModal';

//to be styled later
//post should be in cronological order
export const SocialCard = (props) => {
    const {AllPost:post, status} = useSelector((state)=> state.socialPost);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const dispatch = useDispatch();

    useEffect(()=>{
        if(status!='success'){ 
            dispatch(fetchAllPost());
        }
    },[status])

    const lPost = (id) => {
        dispatch(likePost(id))
    }
    const lComment = (id) =>{
        dispatch(likeComment(id))
    }
    const addComment = (postId, userId, comment) =>{
        const newComment = {
            content: comment,
            likes: 0,
            postId: postId,
            userId: userId,
        }
        dispatch(commentPost(newComment))
        closeModal();
    }
    const openModal = (data) =>{
        setOpen(true);
        setData(data)
    }
    const closeModal = () =>{
        setOpen(false);
        setData({})
    }
    return (
    <Box display='flex' flexDirection='column' align='center'>
        <CommentModal open={open} closeFunc={closeModal} data={data} addComment={addComment} />
        {!!post? post.map(singlePostData=>{
            const {id,postImage,imageUrl,content,likes,comments, user} = singlePostData
            console.log(singlePostData)
            return (
            <Box alignContent='center' border='1px' margin='10px' padding='2px' borderRadius="lg" display='flex' flexDirection='column' maxW='xl' key={id}>
                <Box display='flex' alignItems='center'><Image padding='2px' margin='2px' borderRadius='full' boxSize='50px' alt='' src={user.imageUrl}/><Box>{user.username}</Box><Spacer/><Box>verified tag</Box></Box>
                {postImage ?
                <Box><Image src={imageUrl} alt=''/></Box>:
                null}
                <Box alignSelf='flex-start' marginLeft='5px'>{content}</Box>
                <Box>
                    <Box>likes: {likes}</Box>
                    <Button onClick={()=>lPost(id)}>like</Button>
                    <Button>Share</Button>
                    <Button onClick={()=>{openModal(singlePostData)}} value={id}>Comment</Button>
                </Box>
                <Box>
                    {comments.map(c =>{
                        const {content,likes, user, id} = c;
                        const {username} = user;
                        return(
                            <Box border='1px' borderRadius='lg' key={id}>
                                <Box>{username}: {content}</Box>
                                <Box>
                                    <Box>likes: {likes}</Box>
                                    <Button onClick={()=>lComment(id)}>like</Button>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>)
        })
        : 'There are no post'}
    </Box>
    )
}

export default SocialCard