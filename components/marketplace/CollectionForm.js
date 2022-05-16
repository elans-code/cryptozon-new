import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import ImageInput from "../ImageInput";
export default function CollectionForm() {
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  return (
    <VStack as="form" mt={6} spacing={4}>
      <ImageInput
        title="Profile Photo"
        name="profile"
        boxSize="250px"
        image={image}
        setImage={setImage}
      />
      <ImageInput
        title="Banner Photo"
        name="banner"
        h="200px"
        w="600px"
        image={image2}
        setImage={setImage2}
      />
      <FormControl>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input id="name" name="name" type="text" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea id="description" name="description" />
      </FormControl>
      <Button colorScheme="cyan" alignSelf="start" color="white" type="submit">
        Create
      </Button>
    </VStack>
  );
}
