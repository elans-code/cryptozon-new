import React, { useState, useRef, Fragment as Fr } from "react";
import {
  Container,
  Box,
  Heading,
  Input,
  Image,
  FormControl,
  FormHelperText,
  Text,
  FormLabel,
  VStack,
  Button,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";

export default function CreateNFTPage() {
  const fileRef = useRef();
  const [image, setImage] = useState();
  const btnColor = useColorModeValue("white", "black");
  const [fileError, setFileError] = useState(false);
  const handleFileChange = (e) => {
    const fileInp = e.target.files[0];

    if (
      !(
        fileInp.name.endsWith("jpg") ||
        fileInp.name.endsWith("png") ||
        fileInp.name.endsWith("gif") ||
        fileInp.name.endsWith("jpeg")
      )
    ) {
      setFileError(true);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
        setFileError(false);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onClose = () => setImage(null);
  return (
    <Container maxW="container.sm">
      <VStack spacing={3}>
        <Heading mb={4}>Create your NFT!</Heading>
        <FormControl>
          <FormLabel htmlFor="file">Image, GIFS</FormLabel>
          {fileError && <Text color="red">Unsupported File Type</Text>}
          <FormHelperText mb={4}>
            File types supported: JPG, PNG, GIF
          </FormHelperText>
          <Box
            border="1px solid"
            borderColor="gray.200"
            alignSelf="flex-start"
            boxSize="400"
            borderRadius="10px"
            bgSize="cover"
            bgPos="center"
            pos="relative"
            overflow="hidden"
            bgImg="https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"
            transition="all 0.2s"
            _hover={{ borderColor: "gray.400" }}
          >
            <Input
              type="file"
              id="file"
              placeholder="image"
              onChange={handleFileChange}
              opacity="0"
              height="100%"
              width="100%"
              cursor="pointer"
              display={!image ? "block" : "none"}
              ref={fileRef}
            />
            {image && (
              <Fr>
                <Image
                  src={image}
                  alt="your nft image"
                  objectFit="contain"
                  h="100%"
                  w="100%"
                />
                <CloseButton
                  pos="absolute"
                  top="10px"
                  right="10px"
                  zIndex="10"
                  bgColor="rgba(0,0,0,0.1)"
                  onClick={onClose}
                />
              </Fr>
            )}
          </Box>
        </FormControl>
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
        <Box alignSelf={"flex-start"}>Collection Input Soon</Box>
        <Button colorScheme="cyan" color={btnColor} alignSelf="flex-start">
          Create!
        </Button>
      </VStack>
    </Container>
  );
}
