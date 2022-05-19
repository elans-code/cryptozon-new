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
import ProfileNfts from "./ProfileNfts";
import ProfilePosts from "./ProfilePosts";

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
      {display === "NFT" ? <ProfileNfts nfts={nfts} hidden={hidden} toggle={toggle} setHidden={setHidden}/> : <ProfilePosts posts={user.posts} user={user} />}
    </>
  );
}
