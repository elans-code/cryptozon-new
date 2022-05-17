import React, { useState, useRef, Fragment as Fr } from "react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Image,
  CloseButton,
  Box,
  Input,
} from "@chakra-ui/react";
export default function ImageInput({
  image,
  setImage,
  boxSize,
  borderRadius,
  title,
  name,
  h,
  w,
}) {
  const fileRef = useRef();
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
  const onClose = () => {
    setImage(null);
    fileRef.current.value = "";
  };
  const sizeInp = () => {
    const obj = {};
    if (h && w) {
      obj.h = h;
      obj.w = w;
    } else {
      obj.boxSize = boxSize || "400px";
    }
    return obj;
  };
  return (
    <FormControl>
      <FormLabel htmlFor={name || "file"}>{title || "Image, GIFS"}</FormLabel>
      {fileError && <Text color="red">Unsupported File Type</Text>}
      <FormHelperText mb={4}>
        File types supported: JPG, PNG, GIF
      </FormHelperText>
      <Box
        border="1px solid"
        borderColor="gray.200"
        alignSelf="flex-start"
        {...sizeInp()}
        borderRadius={borderRadius || "10px"}
        bgSize="cover"
        bgPos="center"
        pos="relative"
        overflow="hidden"
        bgImg={
          !image
            ? "https://montevista.greatheartsamerica.org/wp-content/uploads/sites/2/2016/11/default-placeholder.png"
            : "white"
        }
        transition="all 0.2s"
        _hover={{ borderColor: "gray.400" }}
      >
        <Input
          type="file"
          id={name || "file"}
          name={name || "file"}
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
  );
}
