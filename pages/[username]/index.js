import React from 'react'
import axios from 'axios'
import Users from '../../components/Users'
import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from 'next/router';
// import UserProfile from '../components/UserProfile';

export default function User({user}) {
  const address = useAddress();
  const router = useRouter();
  if (user.wallet == address) {
    router.push('/profile')
    // return (<UserProfile />)
  }
  return (
    <>
      <Users user={user} />
    </>
  )
}

export async function getStaticProps({params}) {
  const username = params.username
  const res = await axios.get(`http://localhost:3000/api/users/${username}`)
  const user = await res.data
  return {
    props: {user}
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
