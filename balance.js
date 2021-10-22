const Web3 = require('web3');

/*
   -- get balance --
*/
// Provider
   const providerRPC = {
      development: 'http://localhost:9933',
      moonbase: 'https://rpc.testnet.moonbeam.network',
   };

   const account_from = {
      address: ' Your-Account-For-Search ',
   };

   const web3 = new Web3(providerRPC.moonbase); //Change to correct network
   const deploy = async () => {
      // Return the balance of account
      const balance = await web3.eth.getBalance(account_from.address);
      // Change Wei into Ether
      const myblance = web3.utils.fromWei(balance);
      console.log('Account:', account_from.address);
      console.log('Balance :', myblance);
   };

   deploy();



