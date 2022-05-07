import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react"; // for chakra;
import store from "../store";
import { Provider } from "react-redux";
// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mainnet;

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThirdwebProvider desiredChainId={activeChainId}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ThirdwebProvider>
    </Provider>
  );
}

export default MyApp;
