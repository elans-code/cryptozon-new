import React, { useEffect, useState, Fragment as Fr } from "react";
import { Box, Heading } from "@chakra-ui/react";
import NFTList from "../components/marketplace/NFTList";
import NFTItem from "../components/marketplace/NFTItem";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";

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

  // fetch nft listings
  useEffect(() => {
    getNftListings();

  },[]);

  const getNftListings = async () => {
    try {
      if (!address) {
        return null;
      }
      const nftList = await marketplace.getActiveListings();
      // console.log(nftList);
      setIsLoading(false);
      setNftListings(nftList);

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
      {isLoading ? <div>Loading</div> : <Flex gap="8" wrap="wrap" justifyContent={"center"}>
        {nftListings.length > 0 ? nftListings.map(nft => {
            console.log("nft", nft);
            const { name, description, image } = nft.asset;
            const { id, buyoutPrice, tokenId } = nft
            const price = buyoutPrice / 1e18;

            return (<NFTItem key={tokenId} name={name} description={description} image={image} price={price} id={id} />);
          })
          :
          <div>No listings</div>
        }
        </Flex>
      }
    </Box>
  );
}

export default Marketplace;
