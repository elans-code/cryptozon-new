import React from 'react'
import { Flex, Link as ChakraLink, Button, useColorMode } from '@chakra-ui/react'
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
// const style = {
//   wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex`,

// }

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex as="header" position="fixed" backdropFilter="saturate(180%) blur(5px)"
      w="100%">
      <ChakraLink>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun /> }
        </Button>
      </ChakraLink>
    </Flex>
  )
}

export default Navbar
