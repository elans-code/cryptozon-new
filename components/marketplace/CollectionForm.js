import React, { useState, useRef } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";
import ImageInput from "../ImageInput";
import useCloudinary from "../../hooks/useCloudinary";
export default function CollectionForm() {
  const formRef = useRef();
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const { data, uploadImage } = useCloudinary();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;
    const { name, profile, banner, description } = Object.fromEntries([
      ...new FormData(formEl),
    ]);
  };

  return (
    <VStack as="form" mt={6} spacing={4} onSubmit={handleSubmit} ref={formRef}>
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
