import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"; // for chakra;
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

// <ColorModeScript initialColorMode={theme.config.initialColorMode} />

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
     <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
