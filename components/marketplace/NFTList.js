import React from "react";
import NFTItem from "./NFTItem";
import { Grid, Flex } from "@chakra-ui/react";
export default function NFTList() {
  return (
    <Flex gap="8" wrap="wrap" justifyContent={"center"}>
      <NFTItem />

      <NFTItem />

      <NFTItem />

      <NFTItem />

      <NFTItem />
    </Flex>
  );
}
