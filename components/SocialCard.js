import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Text, Image, Container, Flex, Divider, useDisclosure} from "@chakra-ui/react";
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
    <div>
        <CommentModal open={open} closeFunc={closeModal} data={data} addComment={addComment} />
        {!!post? post.map(singlePostData=>{
            const {id,postImage,imageUrl,content,likes,comments} = singlePostData
            return (<div key={id}>
                <div>Verified tag</div>
                {postImage?
                <div><Image src={imageUrl} alt=''/></div>:
                null}
                <div>{content}</div>
                <div>
                    <div>likes: {likes}</div>
                    <Button onClick={()=>lPost(id)}>like</Button>
                    <Button>Share</Button>
                    <Button onClick={()=>{openModal(singlePostData)}} value={id}>Comment</Button>
                </div>
                <div>
                    {comments.map(c =>{
                        const {content,likes, user, id} = c;
                        const {username} = user;
                        return(
                            <div key={id}>
                                <div>{username}: {content}</div>
                                <div>
                                    <div>likes: {likes}</div>
                                    <Button onClick={()=>lComment(id)}>like</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>)
        })
        : 'There are no post'}
    </div>
    )
}

export default SocialCard