import React, { useEffect, useState, Fragment as Fr } from "react";
import { Box, Heading } from "@chakra-ui/react";
import NFTList from "../components/marketplace/NFTList";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { useRouter } from "next/router";

const Marketplace = () => {
  const [nftListings, setNftListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const address = useAddress();
  const router = useRouter();
  const marketplace = useMarketplace(process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS);

  // redirect to home if no address
  useEffect(() => {
    if (!address) router.replace("/");
  } , [address]);

  useEffect(() => {
    getNftListings();
  },[]);

  const getNftListings = async () => {
    try {
      if (!address) return;
      const nftList = await marketplace.getActiveListings();
      console.log(nftList);
      setNftListings(nftList);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error fetching NFT listings");
    }

  }

  return (
    <Box p="12">
      <Heading textAlign="center" mb="8">
        Cryptozon Market
      </Heading>
      <NFTList />
    </Box>
  );
}

export default Marketplace;
