import React, {useEffect} from 'react'
import { Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Follower from '../../components/Follows';
import { useSelector } from 'react-redux';

export default function Followers() {
  const router = useRouter();
  const {followers} = useSelector(state => state.followers);
  console.log('followers', followers)

  useEffect(() => {

  })

  return (
    <>
    <Button onClick={() => router.push(`/${router.query.username}`)} >Go Back</Button>
    <Text>Followers pg</Text>
    <Follower username={router.query.username}/>
    </>
  )
}
