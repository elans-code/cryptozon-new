// cryptozon.com/marketplace/nfts/[tokenID]
//useRouter hook next/router
//will use same NFTActiveItem component for single NFT display
//tokenId is the id of the NFT

import { useSelector } from "react-redux";
import NFTActiveItem from "../../../components/marketplace/NFTActiveItem";

// export const getStaticProps = async ({ params }) => {
//   const { tokenId } = params;
//   console.log(tokenId);
//   return {
//     props: {
//       tokenId,
//     },
//   };
// }

const URL_PREFIX = "http://localhost:3000/marketplace/nfts/";
const WINDOW_URL = window.location.href;


const NFTDetails = () => {
  const { activeNfts } = useSelector((store) => store);
  const activeNow = activeNfts.activeNfts[0];

  const singleNFTData = activeNow.filter((nft) => {
    const testURL = URL_PREFIX + nft.tokenId
    if (WINDOW_URL === testURL) {
      return nft;
    }
  })
  console.log(singleNFTData[0].asset);
  return (
    <div>
      <h1>
        Details for NFT with tokenId:
      </h1>
    </div>
  )
}


export default NFTDetails;
