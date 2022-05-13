import React from 'react'
import { Text, Divider, Box, Container, Image } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export default function Follower({username}) {
  const {followers} = useSelector(state => state.followers)
  console.log('state', followers)
  return (
    <>
    <Text>Follows</Text>
    <Container>
      {followers?.map(f => (
        <Box key={f.username} w={700} borderWidth={1}>
          <Image alt='user' src={f.imageUrl} h={100} w={100} />
          <Text>{f.username}</Text>
        </Box>
      ))}
    </Container>
    </>
  )
}
