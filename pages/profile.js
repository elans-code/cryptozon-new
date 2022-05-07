import React, {useState} from 'react'
// might not need this rn actually
import { Box, Button, Text, Image, Container, Flex, Divider } from "@chakra-ui/react";
import Link from 'next/link';

const user = {
  username: 'beksin',
  bio: 'blockchain dev straight outta fullstack. here r some of my nfts, hope you like ;)',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU'
}

// start w this for now, make into like card comp
const nfts = [
  {
    imageUrl: '',
    number:'',
    projectName: '',
  }
];

export default function Profile() {
  return (
    <>
    <Container>
      <Box  margin={10} padding={10} display='flex' width={600}>
        <Image
          alt={user.username}
          width={200} height={200}
          borderRadius={100}
          src={user.imageUrl}
          marginRight={10}
        />
        <Flex direction='column' width={500}  >
          <Text fontWeight='bold' fontSize={26}>@{user.username}</Text>
          <Text marginTop={2}>{user.bio}</Text>
          <Text fontSize={12} marginTop={10}>Following 32   - Followers 56</Text>
          <Text fontSize={12}>~ other social accounts ~</Text>
        </Flex>
      </Box>
      {/* <Link href="/">Go Back Home</Link> */}
    </Container>
    <Divider />
    <Container display='flex' justifyContent='space-between'>
      <Box>
        <Text>Owned</Text>
        <Text>Hidden</Text>
      </Box>
      <Box>
      </Box>
    </Container>
    </>
  )
}
