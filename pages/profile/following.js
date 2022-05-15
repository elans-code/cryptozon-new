import React, {useEffect} from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Box, Image, Text, Button, useDisclosure, Stack, Flex} from '@chakra-ui/react';
import { fetchFollowing } from '../../store/following';
import Link from 'next/link';
import { useAddress } from '@thirdweb-dev/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

export default function UserFollowing() {
  const dispatch = useDispatch();
  const {following} = useSelector(state => state.following);
  const wallet = useAddress();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchFollowing(wallet))
  }, [])

  return (
    <>
    <Button ml={5} onClick={() => router.push(`/profile`)} >{<ArrowBackIcon w={8} h={8} mr={1}/>}Back</Button>
    <Text fontSize={20} fontWeight='bold' textAlign='center' mb={5}>Following</Text>
    <Container>
    {following?.map(f => (
      <Link key={f.username} href={`/${f.username}`} passHref>
        <Flex  w='100%' borderWidth={1} alignItems='center' cursor='pointer' mb={2}>
          <Image alt='user' src={f.imageUrl} h={100} w={100} borderRadius={100} m={2}/>
          <Text fontSize={30} ml={5}>@{f.username}</Text>
        </Flex>
      </Link>
    ))}
  </Container>
    </>
  )
}
