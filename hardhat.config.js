// https://raw.githubusercontent.com/rodrigoherrerai/hardhat-tutorial/master/project1/hardhat.config.js

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

const privateKey = process.env.PRIVATE_METAMASK_KEY;
const endpoint = process.env.ALCHEMY_URL;


module.exports = {
  solidity: {
    version: "0.8.8",
  },
  networks: {
    goerli: {
      url: endpoint,
      accounts: [privateKey]
    }
  }
}

