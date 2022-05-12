import { useAddress } from "@thirdweb-dev/react";
import { Fragment as Fr } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  StackDivider,
  Text,
  VStack,
  Flex,
  Link as ChakraLink,
} from "@chakra-ui/react";

export default function Home() {
  const address = useAddress();

  return (
    <Box>
      {address ? (
        <Fr>
          <Text>Your address: {address}</Text>
        </Fr>
      ) : null}
    </Box>
  );
}
