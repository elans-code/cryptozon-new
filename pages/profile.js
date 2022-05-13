import React, {useState, useEffect} from 'react'
import UserProfile from '../components/UserProfile';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { ethers } from 'ethers';

export default function Profile() {
  // will include method to fetch user nfts

  return (
    <>
      <UserProfile />
    </>
  )
}

