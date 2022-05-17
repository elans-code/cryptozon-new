import axios from "axios";
export const wrapAsync = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    throw err;
  });

export const sellNFT = async (contract, nft, price) => {
  try {
  } catch (err) {}
  const listing = {
    assetContractAddress: nft.assetContractAddress,
    tokenId: nft.tokenId,
    startTimestamp: new Date(),
    listingDurationInSeconds: 2630000,
    quantity: 1,
    currencyContractAddress: NATIVE_TOKEN_ADDRESS,
    buyoutPricePerToken: price,
  };

  const tx = await contract.direct.createListing(listing);
  const receipt = tx.receipt; // the transaction receipt
  const listingId = tx.id; // the id of the newly created listing
};

export const buyNFT = async (contract, listingId) => {
  try {
    const quantityDesired = 1;
    await contract.direct.buyoutListing(listingId, quantityDesired);
  } catch (err) {
    throw new Error(err.message);
  }
};

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cryptozon");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dpkj75tyu/image/upload",
      formData
    );
    return data.secure_url;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong uploading.");
  }
};
