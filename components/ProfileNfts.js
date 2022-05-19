import React from "react";
import { Container, Box, Divider, Image, Button, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function ProfileNfts({ nfts, hidden, toggle, setHidden }) {
  const isEmpty = nfts.data.length === 0;

  return (
    <>
      {!isEmpty ? (
        <Container
          maxW={1100}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            w={100}
            textAlign="center"
            alignSelf="flex-start"
            mt="20px"
            mr="15px"
          >
            <Button variant="ghost" onClick={() => setHidden(false)}>
              Owned
            </Button>
            <Divider m="5px" />
            <Button variant="ghost" onClick={() => setHidden(true)}>
              Hidden
            </Button>
          </Box>
          <Box
            flex={1}
            display="flex"
            flexWrap="wrap"
            width={500}
            justifyContent="flex-start"
          >
            {nfts.data
              .filter((n) => n.hidden === hidden)
              .map((nft) => (
                <Box
                  _hover={{ border: "1px solid black" }}
                  key={nft.id}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  m="10px"
                  maxW="290px"
                >
                  <Image src={nft.image} alt={nft.name} w="290px" h="250px" />
                  <Box p="6">
                    <Box
                      mt="1"
                      fontWeight="semibold"
                      as="h4"
                      lineHeight="tight"
                      isTruncated
                    >
                      {nft.name}
                    </Box>
                    <Box>{nft.description}</Box>
                    <Button
                      fontSize={10}
                      h="15px"
                      w="40px"
                      mt={1}
                      onClick={() => toggle(nft)}
                    >
                      toggle
                    </Button>
                    <HamburgerIcon ml="120px" />
                  </Box>
                </Box>
              ))}
          </Box>
        </Container>
      ) : (
        <Text>~ no nfts to display ~</Text>
      )}
    </>
  );
}
