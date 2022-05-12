/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS:
      "0xe9a6397F73B411f31eB23E7A1eA259E88d884f0a",
    NFT_COLECTION_CONTRACT_ADDRESS:
      "0xFe1d218b269D5f202961d1C6F72C0101ad10848c",
  },
};
module.exports = nextConfig;
