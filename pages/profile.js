import React, {useState} from 'react'
import { Box, Button, Text, Image, Container, Flex, Divider } from "@chakra-ui/react";
import Navbar from '../components/Navbar';

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
    hidden: false
  },
  {
    id: 2,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 420,
    projectName: 'BAYC',
    hidden: false
  },
  {
    id: 3,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: false
  },
  {
    id: 4,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: false
  },
  {
    id: 5,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: false
  },
  {
    id: 6,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: false
  },
  {
    id: 7,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: true
  },
  {
    id: 8,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: false
  },
  {
    id: 9,
    imageUrl: 'https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png',
    token: 783,
    projectName: 'BAYC',
    hidden: true
  }
];

export default function Profile() {
  // gonna use this when switching between which nft's user wants to display
  const [visibility, setVisibility] = useState('owned');

  return (
    <>
    <Navbar />
    <Container>
      <Box margin={10} padding={10} display='flex' flexDirection='column' width={600}>
        <Image
          alt={user.username}
          w={200} h={200}
          borderRadius={100}
          src={user.imageUrl}
          mr={10}
        />
        <Flex direction='column' w={500} mt='15px' >
          <Text fontWeight='bold' fontSize={26}>@{user.username}</Text>
          <Text mt={2}>{user.bio}</Text>
          <Text fontSize={12} mt={10}>Following 32   - Followers 56</Text>
          <Text fontSize={12}>~ other social accounts ~</Text>
        </Flex>
      </Box>
    </Container>
    <Divider />
    <Container maxW={1000} display='flex' justifyContent='space-between' alignItems='center'>
      <Box w={100} textAlign='center' alignSelf='flex-start' mt='20px'>
        <Button>Owned</Button>
        <Divider m='5px'/>
        <Button>Hidden</Button>
      </Box>
      <Box flex={1} display='flex' flexWrap='wrap' width={500} justifyContent='center' >
        {nfts.map(nft => (
        <Box _hover={{border: '1px solid black'}} key={nft.id} borderWidth='1px' borderRadius='lg' overflow='hidden' m='10px' maxW='250px' >
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
