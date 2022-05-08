import React from 'react'
import { Flex, Link as ChakraLink, Button, useColorMode } from '@chakra-ui/react'
import DarkModeSwitch from './DarkModeSwitch';


const Navbar = () => {
  return (
    <Flex as="header" position="fixed" backdropFilter="saturate(180%) blur(5px)"
      w="100%">
      <DarkModeSwitch />
    </Flex>
  )
}

export default Navbar
