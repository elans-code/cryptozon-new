import React, {useState} from 'react'
// might not need this rn actually
import { Box, Button, Text, Image, Container, Flex, Divider } from "@chakra-ui/react";
import Link from 'next/link';

// dummy data
const user = {
  username: 'beksin',
  bio: 'nft degen / blockchain dev straight outta fullstack. here r some of my nfts, hope you like ;)',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgSmojUgwjIB87c4Q0hLCAyl__oiTySWGWJUZtUNHlHjBALLzTsu_vMHYMaEwLts4QEoo&usqp=CAU'
}

const nfts = [
  {
    id: 1,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 69,
    projectName: 'BAYC',
  },
  {
    id: 2,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 420,
    projectName: 'BAYC',
  },
  {
    id: 3,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  },
  {
    id: 4,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  },
  {
    id: 5,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  },
  {
    id: 6,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  },
  {
    id: 7,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  },
  {
    id: 8,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  },
  {
    id: 9,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
  }
];

export default function Profile() {
  return (
    <>
    <Container>
      <Box margin={10} padding={10} display='flex' width={600}>
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
    <Container maxW={1000} display='flex' justifyContent='space-between' alignItems='center'>
      <Box width={100} textAlign='center' alignSelf='flex-start' marginTop='20px'>
        <Button>Owned</Button>
        <Divider margin='5px'/>
        <Button>Hidden</Button>
      </Box>
      <Box flex={1} display='flex' flexWrap='wrap' width={500} justifyContent='center' >
        {nfts.map(nft => (
        <Box key={nft.id} borderWidth='1px' borderRadius='lg' overflow='hidden' margin='10px' maxW='250px' >
          <Image src={nft.imageUrl} alt="Bored Ape" />

          <Box p='6'>

            <Box
              mt='1'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              isTruncated
            >
              {nft.projectName}#{nft.token}
            </Box>
            <Box>
              {nft.projectName}
            </Box>
          </Box>
        </Box>
        ))}
      </Box>
    </Container>
    </>
  )
}
