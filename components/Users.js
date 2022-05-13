import React, { useEffect } from 'react';
import { Box, Button, Text, Image, Container, Flex, Divider, Stack } from "@chakra-ui/react";
import {ChatIcon} from "@chakra-ui/icons";
import { fetchFollowers, followUser } from '../store/followers';
import { fetchFollowing } from '../store/following';
import { useDispatch, useSelector } from 'react-redux';
import { useAddress } from '@thirdweb-dev/react';

/*
  this pg is nearly identical to the profile pg, but this is specifically for other users when you visit their profile;
  functionality and display are a bit different, you can't edit their pg and you can't view their hidden nfts

  when visiting this pg, we'll have to use the username to get their wallet, and from there we can grab their nfts based on their wallet

  do we need to include users in our state?
*/

const nfts = [
  {
    id: 1,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 69,
    projectName: "BAYC",
    hidden: false,
  },
  {
    id: 2,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 420,
    projectName: "BAYC",
    hidden: false,
  },
  {
    id: 3,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: false,
  },
];

export default function Users({user}) {
  const dispatch = useDispatch();
  const {id, username} = user;
  const wallet = useAddress();

  // might just move this to actual followers pg
  useEffect(() => {
    dispatch(fetchFollowers(id))
    dispatch(fetchFollowing(id))
  }, [])

  function follow(wallet, username) {
    dispatch(followUser({wallet, username}))
  }

  return (
    <>
      <Container>
        <Box
          margin={10}
          padding={10}
          display="flex"
          flexDirection="column"
          width={600}
        >
          <Image
            alt={user.username}
            w={200}
            h={200}
            borderRadius={100}
            src={user.imageUrl}
            mr={10}
          />
          <Flex direction="column" w={500} mt="15px">
            <Stack direction='row' spacing={220}>
              <Text fontWeight="bold" fontSize={26}>
                @{user.username}
              </Text>
              <Box>
              <ChatIcon mr={4} _hover={{cursor: 'pointer', opacity: '0.8'}}/>
              <Button w={100} borderRadius={50} onClick={() => follow(wallet, username)}>Follow</Button>
              </Box>
            </Stack>
            <Text mt={5}>{user.bio}</Text>
            <Text fontSize={12} mt={10}>
              Following {user.following} - Followers {user.followers}
            </Text>
            <Text fontSize={12}>~ other social accounts ~</Text>
          </Flex>
        </Box>
      </Container>
      <Divider />
      <Container
        maxW={1000}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* <Box w={100} textAlign="center" alignSelf="flex-start" mt="20px">
          <Button>Owned</Button>
          <Divider m="5px" />
          <Button>Hidden</Button>
        </Box> */}
        <Box
          flex={1}
          display="flex"
          flexWrap="wrap"
          width={500}
          justifyContent="center"
        >
          {nfts.map((nft) => (
            <Box
              _hover={{ border: "1px solid black" }}
              key={nft.id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              m="10px"
              maxW="250px"
            >
              <Image src={nft.imageUrl} alt="Bored Ape" />
              <Box p="6">
                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {nft.projectName}#{nft.token}
                </Box>
                <Box>{nft.projectName}</Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}
