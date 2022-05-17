import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Text,
  Image,
  Container,
  Flex,
  Divider,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  Grid,
  GridItem as Gi,
} from "@chakra-ui/react";
import { fetchUser } from "../store/userSlice";
import { useAddress } from "@thirdweb-dev/react";
import { useSelector, useDispatch } from "react-redux";
import EditProfile from "./EditProfile";
import Link from "next/link";
import axios from "axios";

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
  {
    id: 4,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: false,
  },
  {
    id: 5,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: false,
  },
  {
    id: 6,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: false,
  },
  {
    id: 7,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: true,
  },
  {
    id: 8,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: false,
  },
  {
    id: 9,
    imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
    token: 783,
    projectName: "BAYC",
    hidden: true,
  },
];

export default function UserProfile() {
  const dispatch = useDispatch();
  const address = useAddress();
  const { user } = useSelector((state) => state.user);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    if (address) {
      dispatch(fetchUser(address));
      getAllUsernames();
    }
  }, [address]);

  // using this to compare usernames when editing and set up error handling
  async function getAllUsernames() {
    const res = await axios.get("http://localhost:3000/api/users");
    const names = res.data.map((u) => {
      if (u.username == user.username) {
        return "";
      } else {
        return u.username;
      }
    });
    setUsernames(names);
  }

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" textAlign="center" />
      </Box>
    );
  }

  return (
    <>
      <Container>
        {/* {!user.username &&
            <Alert transitionDuration='1000' status='info' mb={4} w={275} position='absolute' right={2} isClosable={true}>
              <AlertIcon />
              Please set up your profile :)
            </Alert>
          } */}
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
            <Text fontWeight="bold" fontSize={26}>
              @{user.username ? user.username : "unnamed"}
            </Text>
            <Text mt={2}>{user.bio}</Text>
            <Stack direction="row" fontSize={12} mt={10} spacing={5}>
              <Link href="/profile/following">
                {"Following " + user.following}
              </Link>
              <Link href="/profile/followers">
                {"Followers " + user.followers}
              </Link>
            </Stack>
            <Stack direction="row" spacing={200}>
              <Text fontSize={12}>~ other social accounts ~</Text>
              <EditProfile user={user} wallet={address} usernames={usernames} />
            </Stack>
          </Flex>
          {!user.username && (
            <Alert
              justifySelf="center"
              status="info"
              mt={8}
              w={460}
              isClosable={true}
            >
              <AlertIcon />
              Please set up your profile :)
            </Alert>
          )}
        </Box>
      </Container>
      <Divider />
      <Container
        maxW={1000}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {user.username ? (
          <Box w={100} textAlign="center" alignSelf="flex-start" mt="20px">
            <Button>Owned</Button>
            <Divider m="5px" />
            <Button>Hidden</Button>
          </Box>
        ) : null}
        <Box
          flex={1}
          display="flex"
          flexWrap="wrap"
          width={500}
          justifyContent="center"
        >
          {user.username
            ? nfts.map((nft) => (
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
              ))
            : null}
        </Box>
      </Container>
    </>
  );
}
