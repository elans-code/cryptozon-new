import { Fragment as Fr } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "./Navbar";
export default function Layout({ children }) {
  return (
    <Fr>
      <Navbar />
      <Box>{children}</Box>
    </Fr>
  );
}
