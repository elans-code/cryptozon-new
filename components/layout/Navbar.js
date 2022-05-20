import React from "react";
import { Flex, useColorModeValue, Heading } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";
import NextLink from "next/link";

const Navbar = ({ intersects }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Flex
      py={2}
      pos="sticky"
      top="0"
      bgColor={bgColor}
      mb="4"
      transition="all 0.4s"
      zIndex="50"
      boxShadow={intersects ? "base" : "none"}
    >
      <NextLink href="/post" passHref>
        <Heading
          fontSize="3.1rem"
          fontFamily="Saira Stencil One, cursive"
          textTransform="uppercase"
          alignSelf={"center"}
          px={8}
          color="cyan.500"
          cursor="pointer"
          textShadow="2px 5px 3.5px rgba(0, 0, 0, 0.18)"
        >
          Cryptozon
        </Heading>
      </NextLink>
      <DarkModeSwitch />
    </Flex>
  );
};

export default Navbar;
