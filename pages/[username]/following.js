import React from 'react'
import { Text, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Following() {
  const router = useRouter();

  return (
    <>
    <Button onClick={() => router.push(`/${router.query.username}`)}>Go Back</Button>
    <Text>Following pg</Text>
    </>
  )
}
