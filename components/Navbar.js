import React from 'react'
import { Flex, Link as ChakraLink, Button, useColorMode } from '@chakra-ui/react'
import DarkModeSwitch from './DarkModeSwitch';


const Navbar = () => {
  return (
    <Flex>
      <DarkModeSwitch />
    </Flex>
  )
}

export default Navbar
