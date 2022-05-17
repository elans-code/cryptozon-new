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
import { uploadImage } from "../../utils";
import axios from "axios";
export default function CollectionForm({ address }) {
  const formRef = useRef();
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = formRef.current;
    const {
      name,
      profile: profileImg,
      banner: bannerImg = "",
      description = "",
    } = Object.fromEntries([...new FormData(formEl)]);
    if (!name || !profileImg)
      return alert("name and profile photo must be provided");
    try {
      const profileUrl = await uploadImage(profileImg);
      let bannerUrl = "";
      if (bannerImg) {
        bannerUrl = await uploadImage(bannerImg);
      }

      await axios.post("/api/collections", {
        name,
        bannerImg: bannerUrl,
        profileImg: profileUrl,
        description,
        address,
      });

      formEl.elements.name.value = "";
      formEl.elements.description.value = "";
      formEl.elements.profile.value = "";
      formEl.elements.banner.value = "";
      setImage(null);
      setImage2(null);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
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
