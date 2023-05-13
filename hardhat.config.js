require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = process.env.GOERLI_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const SEPOLIA_URL = process.env.SEPOLIA_URL;

module.exports = {
  solidity: "0.8.18",
  // defaultNetwork: "goerli",
  networks: {
    hardhat:{},
    // goerli:{
    //   url: GOERLI_URL,
    //   accounts: [PRIVATE_KEY]
    // },
    sepolia:{
      url:SEPOLIA_URL,
      accounts: [PRIVATE_KEY]
    }
  },
};
