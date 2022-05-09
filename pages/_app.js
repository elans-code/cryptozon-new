import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import store from "../store";
import { Provider } from "react-redux";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react"; // for chakra;
import Navbar from "../components/Navbar";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

// <ColorModeScript initialColorMode={theme.config.initialColorMode} />

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </Provider>
  );
}

export default MyApp;
