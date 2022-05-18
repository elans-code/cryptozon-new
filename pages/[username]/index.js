import React from 'react'
import axios from 'axios'
import Users from '../../components/Users'
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from 'next/router';

export default function User({user}) {
  // console.log('walllllettt', user.wallet)
  const address = useAddress();
  const router = useRouter();
  if (user.wallet == address) {
    router.push('/profile')
  }
  return (
    <>
      <Users user={user} />
    </>
  )
}

export async function getStaticProps({params}) {
  const username = params.username
  const userRes = await axios.get(`http://localhost:3000/api/users/${username}`)
  const user = userRes.data

  // const nftRes = await axios.get(`http://localhost:3000/api/nfts?owner=${user.wallet}`)
  // const nfts = nftRes.data

  return {
    props: {
      user,

    }
  }
}

export async function getStaticPaths() {
  const res = await axios.get('http://localhost:3000/api/users')
  const users = res.data

  const paths = users.map(user => ({params: {username: user.username.toString()}}))

  return {
    paths,
    fallback: false
  }
}
