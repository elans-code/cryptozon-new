import React from "react";
import NFTItem from "./NFTCollectionItem";
import { Grid, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
export default function NFTList({ nfts, collectionName }) {
  const user = useSelector((state) => state.user);
  return (
    <Grid
      columnGap="1.3rem"
      rowGap="1.6rem"
      templateColumns="repeat(auto-fill, minmax(18rem,1fr))"
      justifyItems={"stretch"}
      justifyContent="center"
      alignItems="start"
    >
      {nfts.length ? (
        nfts.map((el) => (
          <NFTItem key={el.id} nft={el} collName={collectionName} user={user} />
        ))
      ) : (
        <Text>No NFT</Text>
      )}
    </Grid>
  );
}
