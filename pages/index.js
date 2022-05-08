import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Fragment as Fr } from "react";
import Link from "next/link";
import { Box, Button, StackDivider, Text, useColorMode, VStack, Flex, Link as ChakraLink} from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';
import Navbar from "../components/Navbar";



export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  // const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack>
      <Navbar />
      <Flex
        top="1rem"
        right="1rem"
        align="center"
        >

        <Box >Logo</Box>
          <ChakraLink to="/discovery">Discovery</ChakraLink>
          <ChakraLink to="/shop">Shop</ChakraLink>

          <ChakraLink>
            {address ? (
              <Fr>
                <Button onClick={disconnectWallet}>Disconnect Wallet</Button>
              </Fr>
            ) : (
              <Button onClick={connectWithMetamask}>Connect with Metamask</Button>
            )}
          </ChakraLink>
        </Flex>

        <Box>
          { address ?
            <Fr>
              <Text>Your address: {address}</Text>
            </Fr>
            : null
          }
        </Box>

        <Box>
          Main Content Area
        </Box>
    </VStack>
  );
}
