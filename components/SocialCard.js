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
        {post ? post.map(singlePostData=>{
            return (<div key={singlePostData.id}>
                <div>Verified tag</div>
                <div>SocialCard</div>
                {/* <div><Image src={singlePostData.imgUrl} alt=''>post img</Image></div> */}
                <div>{singlePostData.content}</div>
                <div>
                    <div>likes: {singlePostData.likes}</div>
                    <Button>like</Button>
                    <Button>Share</Button>
                    <Button>Comment</Button>
                </div>
            </div>)
        })
        : 'There are no post'}
    </div>
    )
}

export default SocialCard