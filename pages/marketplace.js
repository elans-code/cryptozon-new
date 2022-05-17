import React, { useEffect, useState, Fragment as Fr } from "react";
import { Box, Heading } from "@chakra-ui/react";
import NFTList from "../components/marketplace/NFTList";
import NFTItem from "../components/marketplace/NFTItem";
import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { Flex } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";

const Marketplace = () => {
  const { activeNfts } = useSelector((store) => store);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  },[]);

  return (
    <Box px="12">
      <Heading textAlign="center" mb="8">
        Cryptozon Market
      </Heading>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Flex gap="8" wrap="wrap" justifyContent={"center"}>
          {activeNfts.activeNfts.length > 0 ? (
            activeNfts.activeNfts[0].map((nft) => {
              console.log("nft", nft);
              const { name, description, image } = nft.asset;
              const { id, buyoutPrice, tokenId } = nft;
              const price = buyoutPrice / 1e18;

              return (
                <NFTItem
                  key={tokenId}
                  name={name}
                  description={description}
                  image={image}
                  price={price}
                  id={id}
                />
              );
            })
          ) : (
            <div>No listings</div>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Marketplace;
