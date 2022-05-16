import { wrapAsync } from "../../../utils";
import { NFTs, Collections } from "../../../db/";

const createNFT = wrapAsync(async (req, res) => {
  const { owner, name, description, tokenId, image, uri, collection } =
    req.body;
  const newNFT = await NFTs.create({
    owner,
    name,
    description,
    tokenId,
    image,
    uri,
    assetContractAddress: process.env.NFT_COLECTION_CONTRACT_ADDRESS,
    collectionId: collection,
  });

  return res.status(201).json({ status: "success", data: newNFT });
});

const getOwnerNFTs = wrapAsync(async (req, res) => {
  if (!req.query.owner.startsWith("0x"))
    throw new Error("Invalid wallet address");

  const ownerNFTs = await NFTs.findAll({ where: { owner: req.query.owner } });
  if (!ownerNFTs.length) throw new Error("Owner has no NFTs");
  return res.status(200).json({ status: "success", data: ownerNFTs });
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        return await createNFT(req, res);
      case "GET":
        if (req.query.owner) {
          return await getOwnerNFTs(req, res);
        }
      default:
        throw new Error("Not a route.");
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}
