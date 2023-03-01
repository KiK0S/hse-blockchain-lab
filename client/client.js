const Web3 = require("web3");
const fs = require('fs');
const solc = require('solc');
require("dotenv").config();

const input = require('../artifacts/contracts/MyToken.sol/DVDToken.json');

// Configuring the connection to an Ethereum node
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    process.env.INFURA_URL
  )
);
// Creating a signing account from a private key
const signer = web3.eth.accounts.privateKeyToAccount(
  process.env.PRIVATE_METAMASK_KEY
);
web3.eth.accounts.wallet.add(signer);
// Creating a Contract instance
const contract = new web3.eth.Contract(
  input.abi,
  // Replace this with the address of your deployed contract
  process.env.CONTRACT_ADDRESS
);

async function add(name, HD, id) {
  const txAdd = contract.methods.addDVD(signer.address, name, HD, id);
  await txAdd
    .send({
      from: signer.address,
      gas: await txAdd.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Added dvd`);
      console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
} 

async function get(id) {
  const txGet = contract.methods.getDVD(id);
  await txGet
    .send({
      from: signer.address,
      gas: await txGet.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Got dvd`);
      console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
}

async function remove(id) {
  const txRemove = contract.methods.removeDVD(id);
  await txRemove
    .send({
      from: signer.address,
      gas: await txRemove.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Removed dvd`);
      console.log(`https://goerli.etherscan.io/tx/${txhash}`);
    });
} 

async function getFiltered(from, to) {
  contract.getPastEvents(
    'AllEvents',
    {
      fromBlock: from,
      toBlock: to,
    }, 
    (err, events) => console.log(events),
  );
}

// example
add("harry potter", true, 1);
get(1);
remove(1);
getFiltered(0, 'latest');