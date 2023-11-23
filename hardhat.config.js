require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

_PRIVATE_KEY = process.env.PRIVATE_KEY;
console.log("Private Key:", _PRIVATE_KEY);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {},
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [_PRIVATE_KEY],
    },
  },
};
