import React from "react";
import {
  Box,
  Image,
  Grid,
  GridItem as Gi,
  Text,
  Button,
} from "@chakra-ui/react";
import { useMarketplace } from "@thirdweb-dev/react";

const NFTItem = (props) => {
  const { nft, collName, user } = props;
  console.log(nft);
  const isExpired = Date.now() > new Date(nft.expirationDate);
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const { user: signedUser } = user;
  const buyNFT = async () => {
    try {
      await marketplace.buyoutListing(id, 1);
      alert("NFT purchased");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Error buying NFT");
    }
  };

  return (
    <Box
      boxShadow="lg"
      borderRadius="10px"
      overflow="hidden"
      cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
    >
      <Image src={nft.image} alt="nft pic" objectFit="fill" boxSize="300px" />
      <Grid templateColumns="repeat(2,1fr)" p="4">
        <Gi>
          <Text color="gray.500">{collName}</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text color="gray.500">&nbsp;</Text>
        </Gi>
        <Gi>
          <Text>{nft.name}</Text>
        </Gi>
        <Gi justifySelf="end">
          <Text>
            {/*<Image
              src="https://openseauserdata.com/files/6f8e2979d428180222796ff4a33ab929.svg"
              alt="eth"
              boxSize="12.5px"
              display="inline-block"
            />{" "}
            price*/}
          </Text>
        </Gi>

        <Gi gridColumn="span 2" justifySelf="end">
          <Text></Text>
        </Gi>
        <Gi gridColumn="span 2" justifySelf="end">
          <Button>Wassup</Button>
        </Gi>
      </Grid>
    </Box>
  );
};

export default React.memo(NFTItem);
