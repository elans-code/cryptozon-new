import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import DarkModeSwitch from "./DarkModeSwitch";

const Navbar = ({ intersects }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  return (
    <Flex
      pos="sticky"
      top="0"
      bgColor={bgColor}
      mb="4"
      transition="all 0.4s"
      zIndex="50"
      boxShadow={intersects ? "base" : "none"}
    >
      Hi
      <DarkModeSwitch />
    </Flex>
  );
};

export default Navbar;
