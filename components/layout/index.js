import { Fragment as Fr, useState, useEffect, useCallback } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
export default function Layout({ children }) {
  const [intersected, setIntersected] = useState(false);
  const onScrollDown = useCallback((e) => {
    setIntersected(window.scrollY > 15);
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", onScrollDown);
    return () => window.removeEventListener("scroll", onScrollDown);
  }, [onScrollDown]);

  return (
    <Fr>
      <Navbar intersects={intersected} />
      <Box>{children}</Box>
    </Fr>
  );
}
