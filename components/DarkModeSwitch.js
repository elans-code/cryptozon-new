import React, { useState,Fragment as Fr  } from 'react'
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import { Flex, Link as ChakraLink, Button, useColorMode, IconButton } from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link'

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <Flex>
      <Flex
        pos="fixed"
        top="1rem"
        right="1rem">

        <Flex>
          <Link href='/' passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Contact"
              my={5}
              w="100%"
            >
              Discovery
            </Button>
          </Link>
          <Link href='/' passHref>
            <Button
            as="a"
              variant="ghost"
              aria-label="Contact"
              my={5}
              w="100%"
            >
              Shop
            </Button>
          </Link>
          <Link href='/profile' passHref>
            <Button
              as="a"
              variant="ghost"
              aria-label="Contact"
              my={5}
              w="100%"
            >
              Profile
            </Button>
          </Link>
          <ChakraLink>
                {address ? (
                  <Fr>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Contact"
                      my={5}
                      w="100%"
                      onClick={disconnectWallet}
                    >
                    Disconnect Wallet
                    </Button>
                  </Fr>
                ) : (
                  <Fr>
                    <Button
                      as="a"
                      variant="ghost"
                      aria-label="Contact"
                      my={5}
                      w="100%"
                      onClick={connectWithMetamask}>Connect with Metamask</Button>
                  </Fr>
                )}
          </ChakraLink>
          <ChakraLink>
            <Button
              onClick={toggleColorMode}>
              {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun /> }
            </Button>
          </ChakraLink>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default DarkModeSwitch
