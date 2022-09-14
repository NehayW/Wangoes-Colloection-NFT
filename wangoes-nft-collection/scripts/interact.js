const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY; //get from alchemy
const CONTRACT_ADDRESS = process.env.CONTRACT; //deployed contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; //metamask

const contract = require('../artifacts/contracts/wangoesCollection.sol/WangoesCollection.json');

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const mint = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer); 

module.exports = { 'contract': mint};

