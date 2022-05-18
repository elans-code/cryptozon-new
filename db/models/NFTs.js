const Sequelize = require("sequelize");
const db = require("../db");

const strOp = (allowNull = true) => ({
  type: Sequelize.STRING,
  allowNull,
});

const NFT = db.define("nft", {
  owner: strOp(false),
  name: strOp(false),
  description: strOp(),
  tokenId: strOp(false),
  image: strOp(false),
  uri: strOp(false),
  assetContractAddress: strOp(false),
  listingId: {
    type: Sequelize.STRING,
  },
  buyoutPrice: {
    type: Sequelize.FLOAT,
    validate: {
      isZeroOrLower(value) {
        if (value <= 0) throw new Error("Only postive values are allowed");
      },
    },
  },
  expirationDate: {
    type: Sequelize.DATE,
  },
  hidden: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = NFT;
