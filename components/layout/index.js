import { Fragment as Fr, useState, useEffect, useCallback } from "react";
import { Box, Heading } from "@chakra-ui/react";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { fetchNFT } from "../../store/nfts";
import { useMarketplace } from "@thirdweb-dev/react";

export default function Layout({ children }) {
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );
  const [allNFTListings, setAllNFTListings] = useState([]);
  const dispatch = useDispatch();
  const [intersected, setIntersected] = useState(false);
  const onScrollDown = useCallback((e) => {
    setIntersected(window.scrollY > 15);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScrollDown);
    return () => window.removeEventListener("scroll", onScrollDown);
  }, [onScrollDown]);

  useEffect(() => {
    // set redux store with all nfts from marketplace contract
    getAllListings();
  }, []);

  const getAllListings = async () => {
    try {
      const nftList = await marketplace.getAllListings();
      setAllNFTListings(nftList);
      console.log(nftList);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Fr>
      <Navbar intersects={intersected} />
      <Box pb={16}>{children}</Box>
    </Fr>
  );
}
