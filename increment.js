const Web3 = require('web3');
const { abi } = require('./compile');

/*
   -- Define Provider & Variables --
*/
// Provider
const providerRPC = {
   development: 'http://localhost:9933',
   moonbase: 'https://rpc.testnet.moonbeam.network',
};
const web3 = new Web3(providerRPC.moonbase); //Change to correct network

// Variables
const account_from = {
   privateKey: '714cede6202d84cc1c093454b1f6b6f47e6968c9fcd7378dfe9acd69a7476d00',
};
const contractAddress = '0xfc56169167299B07445c177D63844a69619D71fC';
const _value = 10;

/*
   -- Send Function --
*/
// Create Contract Instance
const incrementer = new web3.eth.Contract(abi, contractAddress);

// Build Increment Rs
const incrementRs = incrementer.methods.reset();

const increment = async () => {
   console.log(
      `Calling the increment by ${_value} function in contract at address: ${contractAddress}`
   );

   // Sign Rs with PK
   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         to: contractAddress,
         data: incrementRs.encodeABI(),
         gas: await incrementRs.estimateGas(),
      },
      account_from.privateKey
   );

   // Send Rs and Wait for Receipt
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(`Rs successful with hash: ${createReceipt.transactionHash}`);
};

increment();