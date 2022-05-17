import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Text, Image, Container, Flex, Boxider, useDisclosure, Spacer, Divider} from "@chakra-ui/react";
import { fetchAllPost, likeItem, unlikeItem, commentPost, textToImage } from '../store/post';
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

    const unlikePost = (id,e) =>{
        e.target.hidden = true
        const unlikePostData = {
            postId: id,
            userId: walletUser.id,
            type: 'post',
        }
        dispatch(unlikeItem(unlikePostData))
    }
    const unlikeComment = (id,e) =>{
        e.target.hidden = true
        const unlikePostData = {
            commentId: id,
            userId: walletUser.id,
            type: 'comment',
        }
        dispatch(unlikeItem(unlikePostData))
    }
    const lPost = (id, e) => {
        e.target.hidden = true
        const lPostData = {
            postId: id,
            userId: walletUser.id,
            type: 'post'
        }
        dispatch(likeItem(lPostData))
    }
    const lComment = (id, e) =>{
        e.target.hidden = true
        const lCommentData = {
            commentId: id,
            userId: walletUser.id,
            type: 'comment'
        }
        dispatch(likeItem(lCommentData))
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
            const {id,postImage,imageUrl,content,comments, user, contentUri,likes_posts} = singlePostData
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
                    <Box margin='2px'>{likes_posts.length} likes</Box>
                    {likes_posts.filter(like => like.userId === walletUser.id).length > 0 ? <FcLike onClick={(e)=>{unlikePost(id,e)}}/> : <FcLikePlaceholder margin='2px' onClick={(e)=>lPost(id,e)}/>}
                    <FaShareAlt margin='2px' />
                    <FaCommentAlt margin='2px' onClick={()=>{openModal(singlePostData)}} value={id} />
                </Box>
                :
                <Box display='flex' justifyContent='end'>
                    <Box>{likes_posts.length} likes</Box>
                    <FcLikePlaceholder margin='2px' onClick={(e)=>{alertToLogin()}}/>
                    <FaShareAlt />
                    <FaCommentAlt onClick={()=>{alertToLogin()}} value={id} />
                </Box>
                }
                <Box>
                    {tempComments.sort((a,b)=>{return new Date(a.createdAt) > new Date(b.createdAt)}).map(c =>{
                        const {content, user, id,likes_comments} = c;
                        const {username} = user;
                        return(
                            <Box key={id}>
                                <Divider margin='2px' />
                                <Box display='flex'  >
                                    <Box align='start' marginLeft='4px' margin='2px'>{username}: {content}</Box>
                                    <Spacer />
                                    {!!walletUser.username ? 
                                    <Box display='flex' flexDirection='row' margin='3px'>
                                        <Box marginRight='3px'>{likes_comments.length} likes</Box>
                                        {likes_comments.filter(like => like.userId === walletUser.id).length>0 ? <FcLike onClick={(e)=>{unlikeComment(id,e)}}/> : <FcLikePlaceholder onClick={(e)=>lComment(id,e)} margin='5px' />}
                                        
                                    </Box>
                                    :
                                    <Box display='flex' flexDirection='row' margin='3px'>
                                        <Box marginRight='3px'>{likes_comments.length} likes</Box>
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
