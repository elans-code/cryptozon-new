import { useAddress } from "@thirdweb-dev/react";
import { Fragment as Fr } from "react";
import Link from "next/link";
import { Box, Button, StackDivider, Text, VStack, Flex, Link as ChakraLink} from "@chakra-ui/react";
import Navbar from "../components/Navbar";



export default function Home() {
  const address = useAddress();


  // return (
  //   <VStack>
  //     <Navbar />
  //     <Flex
  //       top="1rem"
  //       right="1rem"
  //       align="center"
  //       >

  //       <Box >Logo</Box>



  //       </Flex>

  //       <Box>
  //         { address ?
  //           <Fr>
  //             <Text>Your address: {address}</Text>
  //           </Fr>
  //           : null
  //         }
  //       </Box>

  //       <Box>
  //         Main Content Area
  //       </Box>
  //   </VStack>
  // );
  return (
    <Box>
    <Navbar />
    <Box>
          { address ?
            <Fr>
              <Text>Your address: {address}</Text>
            </Fr>
            : null
          }
        </Box>
    </Box>
  )
}
