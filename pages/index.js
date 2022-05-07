import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { Fragment as Fr } from "react";
import { Box, Button, Text, useColorMode } from "@chakra-ui/react";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';




export default function Home() {
  const address = useAddress();
  const connectWithMetamask = useMetamask();
  const disconnectWallet = useDisconnect();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>

      <Box p={8}>
        {address ? (
          <Fr>
            <Button onClick={disconnectWallet}>Disconnect Wallet</Button>
            <Text>Your address: {address}</Text>
          </Fr>
        ) : (
          <Button onClick={connectWithMetamask}>Connect with Metamask</Button>
        )}

        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun /> }
        </Button>
      </Box>
      <Box pl={8}>
        Main Content Area
      </Box>
    </Box>
  );
}
