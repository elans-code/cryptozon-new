import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Text, Image, Container, Flex, Divider } from "@chakra-ui/react";
import { fetchAllPost } from '../store/post';

//to be styled later
export const SocialCard = (props) => {
    const post = useSelector((state)=> state.post);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchAllPost());
    },[])
    return (
    <div>
        {post ? post.map(singlePostData=>{
            <div>
                <div>Verified tag</div>
                <div>SocialCard</div>
                <div><Image alt=''>post img</Image></div>
                <div>
                    <div>likes</div>
                    <Button>Share</Button>
                    <Button>Comment</Button>
                </div>
            </div>
        })
        : 'There are no post'}
    </div>
    )
}

const mapStateToProps = (state) => ({
    post: state.post
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialCard)