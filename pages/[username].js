import React from 'react'
import axios from 'axios'
import Users from '../components/Users'
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from 'next/router';

export default function User({user}) {
  console.log('wallet', user.wallet)
  const address = useAddress;
  console.log('address', address)
  const router = useRouter();
  if (user.wallet == address) {
    router.push('/')
  } else {
  return (
    <>
      <Users user={user} />
    </>
  )
  }
}

export async function getStaticProps({params}) {
  const username = params.username
  console.log(username)
  const res = await axios.get(`http://localhost:3000/api/users/${username}`)
  const user = await res.data
  return {
    props: {user} //data, prob user
  }
}

export async function getStaticPaths() {
  const res = await axios.get('http://localhost:3000/api/users')
  const users = res.data
  const usernames = users.map(user => user.username)
  const paths = usernames.map(name => ({params: {username: name.toString()}}))

  return {
    paths,
    fallback: false
  }
}
