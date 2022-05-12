import { wrapAsync } from "../../../utils";
import { NFTs } from "../../../db/";
const createNFT = wrapAsync(async (req, res) => {
  const { owner, name, description, tokenId, image, uri } = req.body;
  const newNFT = await NFTs.create({
    owner,
    name,
    description,
    tokenId,
    image,
    uri,
    assetContractAddress: process.env.NFT_COLECTION_CONTRACT_ADDRESS,
  });

  return res.status(201).json({ status: "success", data: newNFT });
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        return await createNFT(req, res);
      default:
        throw new Error("Not a route.");
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}
