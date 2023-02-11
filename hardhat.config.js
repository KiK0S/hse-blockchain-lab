// https://raw.githubusercontent.com/rodrigoherrerai/hardhat-tutorial/master/project1/hardhat.config.js

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;
const etherscanKey = process.env.ETHERSCAN_KEY;


module.exports = {
  solidity: {
    version: "0.8.8",
  },
  networks: {
    goerli: {
      url: `${endpoint}`,
      accounts: [privateKey]
    }
  },
  etherscan: {
    apiKey: etherscanKey
  }
}

