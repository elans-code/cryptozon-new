import React, { useState, useRef, Fragment as Fr } from "react";
import axios from "axios";
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
  Spinner,
  useToast,
  Select,
} from "@chakra-ui/react";

import { useNFTCollection, useAddress } from "@thirdweb-dev/react";

export default function CreateNFTPage() {
  const fileRef = useRef();
  const formRef = useRef();
  const toast = useToast();

  const [image, setImage] = useState();
  const [mintStatus, setMintStatus] = useState("idle");

  const btnColor = useColorModeValue("white", "black");
  const [fileError, setFileError] = useState(false);

  const nftCollection = useNFTCollection(
    process.env.NFT_COLECTION_CONTRACT_ADDRESS ||
      "0xFe1d218b269D5f202961d1C6F72C0101ad10848c"
  );

  const address = useAddress(); // replace with user's state

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
  const onClose = () => {
    setImage(null);
    fileRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;

    const {
      description = "",
      file,
      name,
      supply,
    } = Object.fromEntries([...new FormData(formEl)]);
    if (!(name && file.name && supply))
      return alert("Please fill in the required Inputs");

    if (!address) return alert("No wallet signed in!");

    const metadata = {
      name,
      description,
      image: file,
    };
    try {
      setMintStatus("loading");
      const tx = await nftCollection.mintTo(address, metadata);
      // const receipt = tx.receipt;
      const tokenId = tx.id;
      const {
        owner,
        metadata: { description, image, name, uri },
      } = await tx.data();
      // console.log("NFT DATA", nft);
      // console.log("NFT TOKEN ID", tokenId);
      const newNFT = await axios.post("/api/nfts", {
        owner,
        tokenId: tokenId._hex,
        description,
        image,
        name,
        uri,
      });

      setMintStatus("success");
      toast({
        title: "Successfully Minted!",
        description: "You can now view your NFT in your profile.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      formEl.elements.description.value = "";
      formEl.elements.name.value = "";
      onClose();
    } catch (e) {
      setMintStatus("idle");
      let description = "Something went wrong";
      if (e.message.includes("denied"))
        description = "You denied the transaction request.";
      toast({
        title: "Minting Failed",
        description,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={3} as="form" onSubmit={handleSubmit} ref={formRef}>
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
              name="file"
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
                  bgColor="rgba(0,0,0,0.4)"
                  _hover={{ bgColor: "rgba(0,0,0,0.3)" }}
                  color="white"
                  onClick={onClose}
                  boxShadow="md"
                />
              </Fr>
            )}
          </Box>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input name="name" id="name" type="text" isRequired={true} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input name="description" id="description" type="text" />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="supply">Supply</FormLabel>
          <Input
            name="supply"
            id="supply"
            type="number"
            value={1}
            isReadOnly={true}
          />
        </FormControl>
        {/** this collection input is still for display. once the collection api route is running we could use it */}
        <FormControl pb={2}>
          <FormLabel htmlFor="collection">Collection</FormLabel>
          <Select name="collection" id="collection" defaultValue="default">
            <option value="default" disabled>
              Collection
            </option>
            <option value="tasty_bones">Tasty Bones</option>
            <option value="invisible_friends">Invisible Friends</option>
            <option value="banana_bros">Banana Bros</option>
            <option value="ether_steak">Ether Steak</option>
          </Select>
        </FormControl>

        <Button
          colorScheme="cyan"
          color={btnColor}
          alignSelf="flex-start"
          type="submit"
          isDisabled={mintStatus === "loading"}
        >
          {mintStatus === "loading" ? <Spinner /> : "Create"}
        </Button>
      </VStack>
    </Container>
  );
}
