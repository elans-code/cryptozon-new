import React, {useState, useEffect} from 'react'
import UserProfile from '../components/UserProfile';
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { useAddress, useNFTCollection } from "@thirdweb-dev/react";
import { ethers } from 'ethers';

export default function Profile() {
  // const nftCollection = useNFTCollection("0xfFe31252ef9b1881DaEA612f4b2392E06bbad196");
  // const address = "0x83f2dbfa576bdba1C148484B43d07354A1fbed77";
  // // console.log(nftCollection)
  // async function getUserNfts() {
  //   const nfts = await nftCollection.getOwned(address)
  //   console.log('user nfts are', nfts)
  // }

  // useEffect(() => {
  //   getUserNfts()
  // })

  return (
    <>
      <UserProfile />
    </>
  )
}

