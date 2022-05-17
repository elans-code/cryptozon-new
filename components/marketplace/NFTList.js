import React from "react";
import NFTItem from "./NFTItem";
import { Grid, Text } from "@chakra-ui/react";
export default function NFTList({ nfts, collectionName }) {
  console.log(nfts);
  return (
    <Grid
      columnGap="1.3rem"
      rowGap="1.6rem"
      templateColumns="repeat(auto-fill, minmax(18rem,1fr))"
      justifyItems={"stretch"}
      justifyContent="center"
    >
      {nfts.length ? (
        nfts.map((el) => (
          <NFTItem key={el.id} {...el} collName={collectionName} />
        ))
      ) : (
        <Text>No NFT</Text>
      )}
    </Grid>
  );
}
