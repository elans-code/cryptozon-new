import React, { Fragment as Fr } from "react";
import { Box, Heading } from "@chakra-ui/react";
import NFTList from "../components/marketplace/NFTList";

export default function marketplace() {
  return (
    <Box px="12">
      <Heading textAlign="center" mb="8">
        Cryptozon Market
      </Heading>
      <NFTList />
      <NFTList />
      <NFTList />
    </Box>
  );
}
