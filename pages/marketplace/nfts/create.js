import React, { useState, useRef } from "react";
import {
  Container,
  Box,
  Heading,
  Input,
  Image,
  FormControl,
  FormLabel,
  VStack,
  Button,
} from "@chakra-ui/react";

export default function CreateNFTPage() {
  const fileRef = useRef();
  const [image, setImage] = useState();
  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <Container maxW="container.sm">
      <VStack spacing={3}>
        <Heading mb={4}>Create your NFT!</Heading>
        <Box
          border="1px solid"
          borderColor="gray.200"
          alignSelf="flex-start"
          boxSize="400"
          borderRadius="10px"
          bgSize="cover"
          bgPos="center"
          pos="relative"
          bgImg="https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"
          transition="all 0.2s"
          _hover={{ borderColor: "gray.400" }}
        >
          {!image ? (
            <Input
              type="file"
              placeholder="image"
              onChange={handleFileChange}
              opacity="0"
              height="100%"
              width="100%"
              cursor="pointer"
              ref={fileRef}
            />
          ) : (
            <Image
              src={image}
              alt="your nft image"
              objectFit="contain"
              h="100%"
              w="100%"
            />
          )}
        </Box>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" type="text" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input id="description" type="text" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="supply">Supply</FormLabel>
          <Input
            id="supply"
            type="number"
            value={1}
            disabled
            _disabled={{ cursor: "default" }}
          />
        </FormControl>
        <Box>Collection Input Soon</Box>
        <Button colorScheme="cyan" color="white">
          Create!
        </Button>
      </VStack>
    </Container>
  );
}
