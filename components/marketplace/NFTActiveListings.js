import React from "react";
import NFTActiveItem from "./NFTActiveItem"
import { Grid, Text } from "@chakra-ui/react";
export default function NFTActiveListings({ nfts }) {
  return (
    <Grid
      columnGap="1.3rem"
      rowGap="1.6rem"
      templateColumns="repeat(auto-fill, minmax(18rem,1fr))"
      justifyItems={"stretch"}
      justifyContent="center"
    >
      {nfts.length ? (
        nfts.map((el) => <NFTActiveItem key={el.id} {...el} />)
      ) : (
        <Text>No NFT</Text>
      )}
    </Grid>
  );
}
