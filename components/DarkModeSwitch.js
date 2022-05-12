import React, { useEffect ,useState, Fragment as Fr } from "react";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { BsSun, BsMoonStarsFill } from "react-icons/bs";
import {
  Flex,
  Link as ChakraLink,
  Button,
  useColorMode,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [display, changeDisplay] = useState("none");
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const router = useRouter();

  useEffect(() => {
    if (address) {
      router.replace("/marketplace");
    }
  } , [address]);

  return (
    <Flex>
      <Flex pos="fixed" top="1rem" right="1rem" align="center">
        <Flex display={["none", "none", "flex", "flex"]}>
          <Link href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Discovery
            </Button>
          </Link>
          <Link href="/marketplace" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Shop
            </Button>
          </Link>
          <Link href="/post" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Post
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
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
                  onClick={connectWithMetamask}
                >
                  Connect with Metamask
                </Button>
              </Fr>
            )}
          </ChakraLink>
        </Flex>
        <IconButton
          aria-label="Open Menu"
          size="lg"
          mr={2}
          icon={<HamburgerIcon />}
          display={["flex", "flex", "none", "none"]}
          onClick={() => changeDisplay("flex")}
        />
        <ChakraLink>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
          </Button>
        </ChakraLink>
      </Flex>

      <Flex
        w="100vw"
        bgColor={colorMode === "light" ? "gray.50" : "gray.900"}
        zIndex={20}
        h="100vh"
        pos="fixed"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
        display={display}
      >
        <Flex justify="flex-end">
          <IconButton
            mt={2}
            mr={2}
            aria-label="Close Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => changeDisplay("none")}
          />
        </Flex>
        <Flex flexDir="column" align="center">
          <Link href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Discovery
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              Shop
            </Button>
          </Link>
          <Link href="/profile" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
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
                  onClick={connectWithMetamask}
                >
                  Connect with Metamask
                </Button>
              </Fr>
            )}
          </ChakraLink>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DarkModeSwitch;
