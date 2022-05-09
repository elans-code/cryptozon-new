import React from "react";
import { Box, Image, Grid, GridItem as Gi, Text } from "@chakra-ui/react";

export default function NFTItem() {
  return (
    <Box boxShadow="lg" borderRadius="10px" overflow="hidden" cursor="pointer">
      <Image
        src="https://img.seadn.io/files/732d02d5def11a4f1b3b19386514227b.png?auto=format&h=720&w=720"
        alt="nft pic"
        boxSize="300px"
      />
      <Grid templateColumns="repeat(2,1fr)" p="4">
        <Gi>
          <Text color="gray.500">BEANIES</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text color="gray.500">Price</Text>
        </Gi>
        <Gi>
          <Text>Bean #8055</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text>
            <Image
              src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="test"
              boxSize="12.5px"
              display="inline-block"
            />{" "}
            2.99
          </Text>
        </Gi>
        <Gi gridColumn="span 2" justifySelf="end">
          <Text>1 day left</Text>
        </Gi>
      </Grid>
    </Box>
  );
}
