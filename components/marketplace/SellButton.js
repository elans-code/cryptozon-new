import React from "react";
import { Button } from "@chakra-ui/react";
import { sellNFT } from "../../utils";
export default function SellButton({ marketplace, nft }) {
  const handleSell = async () => {
    try {
    } catch (err) {
      console.log("Something wrong happening!");
    }
  };

  return <Button onClick={handleSell}>Sell</Button>;
}
