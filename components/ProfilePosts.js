import React from 'react'
import { Container, Box, Image, Button, Text, Stack } from "@chakra-ui/react";
import { FcApproval } from 'react-icons/fc';

export default function ProfilePosts({posts, user}) {
  const hasPosts = posts.length > 0;
  // ordering posts
  let postList = posts.slice()
  postList.reverse()

  return (
    <Container display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
      {hasPosts ?
      postList.map(p => (
        <Box key={p.id} w={400} borderWidth={1} mt={5} borderRadius={10}>
          <Stack direction='row' display='flex' alignItems='center'>
            <Image src={user.imageUrl} h='50px' w='50px' borderRadius={100} m={2}/>
            <Text fontSize={16} mt={5}>{user.username}</Text>
            <FcApproval />
          </Stack>
          {p.imageUrl !== '/assets/question.png' ? <Image src={p.imageUrl} alt='post' w={400} h={300}/> : null}
          <Text ml={3} p={5}>{p.content}</Text>
        </Box>
      ))
    : <Text>~ no posts to display ~</Text>
    }
    </Container>
  )
}
