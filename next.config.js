/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS:
      "0xB17A6f81C8ECF5E8d056AE24DF1f30B7f043388d",
    NFT_COLECTION_CONTRACT_ADDRESS:
      "0xFe1d218b269D5f202961d1C6F72C0101ad10848c",
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/post',
        permanent: true,
      },
    ]
  },
};
module.exports = nextConfig;
