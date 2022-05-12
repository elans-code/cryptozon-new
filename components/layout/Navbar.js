import React from "react";
import { Flex } from "@chakra-ui/react";
import DarkModeSwitch from "../DarkModeSwitch";

const Navbar = ({ intersects }) => {
  return (
    <Flex
      pos="sticky"
      top="0"
      bgColor="white"
      mb="4"
      transition="all 0.4s"
      zIndex="50"
      boxShadow={intersects ? "base" : "none"}
    >
      <DarkModeSwitch />
    </Flex>
  );
};

export default Navbar;
