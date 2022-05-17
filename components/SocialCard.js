import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Text, Image, Container, Flex, Boxider, useDisclosure, Spacer, Divider} from "@chakra-ui/react";
import { fetchAllPost, likeComment, likePost, commentPost, textToImage } from '../store/post';
import CommentModal from './CommentModal';
import {FcLike,FcLikePlaceholder, FcApproval} from 'react-icons/fc';
import {FaCommentAlt, FaShareAlt} from 'react-icons/fa'
import { useAddress } from '@thirdweb-dev/react';
import { fetchUser } from '../store/userSlice';
import Addpost from './Addpost';
import Link from 'next/link';

export const SocialCard = (props) => {
    const address = useAddress();
    const {user:walletUser} = useSelector(state => state.user);
    const {AllPost:post, status} = useSelector((state)=> state.socialPost);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    useEffect(()=>{
        if(status!='success'){
            dispatch(fetchAllPost());
        }
    },[status, dispatch])

    const lPost = (id, e) => {
        e.target.hidden = true
        const lPostData = {
            postId: id,
            userId: walletUser.id,
        }
        dispatch(likePost(lPostData))
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
    const alertToLogin = () => {
        alert('Please Log In with your wallet!');
    }
    let tempPost = []
    if(!!post){
        tempPost = [...post]
    }
    return (
    <Box display='flex' flexDirection='column' align='center'>
        {/* {!!address ? 'wallet connected ':'wallet not connected '} */}
        {!!walletUser.username ? '': 'Not logged in viewing as a guest'}
        {!!walletUser.username ? <Addpost/> : null}
        <CommentModal open={open} closeFunc={closeModal} data={data} addComment={addComment} />
        {!!post? tempPost.map(singlePostData=>{
            const {id,postImage,imageUrl,content,likesCount,comments, user, contentUri,likes} = singlePostData
            console.log('likes data:',likes)
            let tempComments = [...comments]
            return (
            <Box alignContent='center' border='1px' margin='10px' padding='2px' borderRadius="lg" display='flex' flexDirection='column' maxW='xl' key={id}>
                <Link key={user.username} href={`/${user.username}`} passHref>
                <Box 
                display='flex' 
                alignItems='center
                '>
                    <Image 
                        padding='2px'
                        margin='2px'
                        borderRadius='full'
                        boxSize='50px'
                        alt=''
                        src={user.imageUrl}
                    />
                    <Box>{user.username}</Box>
                    <FcApproval/>
                </Box>
                </Link>
                {postImage ?
                <Box><Image src={imageUrl} alt=''/></Box>:
                <Box><Image src={contentUri} alt=''/></Box>}
                {postImage ? 
                <Box 
                alignSelf='center' 
                marginLeft='5px'
                display='flex'
                ><Text textAlign='center'>{content}</Text></Box>:
                null}
                {!!walletUser.username ? 
                <Box display='flex' justifyContent='end'>
                    <Box margin='2px'>{likes.length} likes</Box>
                    {likes.filter(like => like.userId === walletUser.id).length > 0 ? <FcLike onClick={()=>{}}/> : <FcLikePlaceholder margin='2px' onClick={(e)=>lPost(id,e)}/>}
                    <FaShareAlt margin='2px' />
                    <FaCommentAlt margin='2px' onClick={()=>{openModal(singlePostData)}} value={id} />
                </Box>
                :
                <Box display='flex' justifyContent='end'>
                    <Box>{likes.length} likes</Box>
                    {likes.filter(like => like.userId === walletUser.id).length > 0 ? <FcLike onClick={()=>{}}/> : <FcLikePlaceholder margin='2px' onClick={(e)=>lPost(id,e)}/>}
                    <FaShareAlt />
                    <FaCommentAlt onClick={()=>{alertToLogin()}} value={id} />
                </Box>
                }
                <Box>
                    {tempComments.sort((a,b)=>{return new Date(a.createdAt) > new Date(b.createdAt)}).map(c =>{
                        const {content,likes, user, id} = c;
                        const {username} = user;
                        return(
                            <Box key={id}>
                                <Divider margin='2px' />
                                <Box display='flex'  >
                                    <Box align='start' marginLeft='4px' margin='2px'>{username}: {content}</Box>
                                    <Spacer />
                                    {!!walletUser.username ? 
                                    <Box display='flex' flexDirection='row' margin='3px'>
                                        <Box marginRight='3px'>{likes} likes</Box>
                                        <FcLikePlaceholder onClick={()=>lComment(id)} margin='5px' />
                                    </Box>
                                    :
                                    <Box display='flex' flexDirection='row' margin='3px'>
                                        <Box marginRight='3px'>{likes} likes</Box>
                                        <FcLikePlaceholder onClick={()=>alertToLogin()} margin='5px' />
                                    </Box>
                                    }
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
