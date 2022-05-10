import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Text, Image, Container, Flex, Divider } from "@chakra-ui/react";
import { fetchAllPost } from '../store/post';

//to be styled later
export const SocialCard = (props) => {
    const {AllPost:post} = useSelector((state)=> state.socialPost);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchAllPost());
    },[])
    return (
    <div>
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
                    <Button>like</Button>
                    <Button>Share</Button>
                    <Button>Comment</Button>
                </div>
                <div>
                    {comments.map(c =>{
                        const {content,likes, user, id} = c;
                        const {username} = user;
                        return(
                            <div key={id}>
                                <div>{username}: {content}</div>
                                <div>
                                    <div>{likes}</div>
                                    <Button>like</Button>
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