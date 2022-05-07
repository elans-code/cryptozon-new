import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Fragment as Fr } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();

  return (
    <Box p={12}>
      {address ? (
        <Fr>
          <Button onClick={disconnectWallet}>Disconnect Wallet</Button>
          <Text>Your address: {address}</Text>
          <Link href="/profile">View Profile</Link>
        </Fr>
      ) : (
        <Button onClick={connectWithMetamask}>Connect with Metamask</Button>
      )}
    </Box>
  );
}
