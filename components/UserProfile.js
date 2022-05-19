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
import { fetchNfts, toggleHidden } from "../store/nfts";
import { useAddress } from "@thirdweb-dev/react";
import { useSelector, useDispatch } from "react-redux";
import EditProfile from "./EditProfile";
import Link from "next/link";
import axios from "axios";

import { HamburgerIcon } from "@chakra-ui/icons";

// const nfts = [
//   {
//     id: 1,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 69,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 2,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 420,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 3,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 4,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 5,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 6,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 7,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: true,
//   },
//   {
//     id: 8,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: false,
//   },
//   {
//     id: 9,
//     imageUrl: "https://miro.medium.com/max/1400/1*cdn3L9ehKspSxiRJfRYSyw.png",
//     token: 783,
//     projectName: "BAYC",
//     hidden: true,
//   },
// ];

export default function UserProfile() {
  const dispatch = useDispatch();
  const address = useAddress();
  const { user } = useSelector((state) => state.user);
  const [usernames, setUsernames] = useState([]);
  const { nfts } = useSelector((state) => state.nfts);
  const [hidden, setHidden] = useState(false);
  const [display, setDisplay] = useState("NFT"); // switch bw post and nft

  console.log("nftssss", nfts);

  useEffect(() => {
    if (address) {
      dispatch(fetchUser(address));
      getAllUsernames();
      dispatch(fetchNfts(address));
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

  function toggle(n) {
    if (n.hidden == false) {
      dispatch(toggleHidden({ ...n, hidden: true }));
    } else {
      dispatch(toggleHidden({ ...n, hidden: false }));
    }
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
            <Alert justifySelf="center" status="info" mt={8} w={460}>
              <AlertIcon />
              Please set up your profile :)
            </Alert>
          )}
        </Box>
      </Container>
      <Stack
        direction="row"
        textAlign="center"
        spacing={10}
        display="flex"
        justifyContent="center"
        mb={2}
      >
        <Button variant="ghost" onClick={() => setDisplay("NFT")}>
          NFTs
        </Button>
        <Button variant="ghost" onClick={() => setDisplay("POST")}>
          Posts
        </Button>
      </Stack>
      <Divider />
      <Container
        maxW={1000}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        {display === "NFT" && user.username ? (
          <Box
            w={100}
            textAlign="center"
            alignSelf="flex-start"
            mt="20px"
            mr="15px"
          >
            <Button variant="ghost" onClick={() => setHidden(false)}>
              Owned
            </Button>
            <Divider m="5px" />
            <Button variant="ghost" onClick={() => setHidden(true)}>
              Hidden
            </Button>
          </Box>
        ) : null}
        <Box
          flex={1}
          display="flex"
          flexWrap="wrap"
          width={500}
          justifyContent="flex-start"
        >
          {!!nfts.data
            ? nfts.data
                .filter((n) => n.hidden === hidden)
                .map((nft) => (
                  <Box
                    _hover={{ border: "1px solid black" }}
                    key={nft.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    m="10px"
                    maxW="250px"
                  >
                    <Image src={nft.image} alt={nft.name} w="250px" h="250px" />
                    <Box p="6">
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                      >
                        {nft.name}#{nft.tokenId}
                      </Box>
                      <Box>{nft.description}</Box>
                      <Button
                        fontSize={10}
                        h="15px"
                        w="40px"
                        mt={1}
                        onClick={() => toggle(nft)}
                      >
                        toggle
                      </Button>
                      <HamburgerIcon ml="120px" />
                    </Box>
                  </Box>
                ))
            : null}
        </Box>
      </Container>
    </>
  );
}
