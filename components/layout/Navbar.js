import React from "react";
import { Flex } from "@chakra-ui/react";
import DarkModeSwitch from "../DarkModeSwitch";

const Navbar = () => {
  return (
    <Flex pos="sticky" top="0" bgColor="white" mb="4">
      <DarkModeSwitch />
    </Flex>
  );
};

export default Navbar;
