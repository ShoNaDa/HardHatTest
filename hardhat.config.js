const Balance = require("./tasks/balance");
const PayDonate = require("./tasks/pay-donat");
const SendDonate = require("./tasks/send-donat");
const ToAddressDonates = require("./tasks/to-address-donates");
const AllDonates = require("./tasks/all-donates");

require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require("@nomiclabs/hardhat-web3");
require('solidity-coverage');

const ALCHEMY_API_KEY = process.env.API_KEY;
const RINKEBY_PRIVATE_KEY = process.env.PRIVATE_KEY;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

//Таски из других файлов
Balance();
PayDonate();
SendDonate();
AllDonates();
ToAddressDonates();

module.exports = {
  solidity: "0.7.3",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`]
    }
  }
};