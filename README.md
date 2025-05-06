# Fake USDT Transfer Scripts

A collection of scripts for demonstrating and testing USDT transfer functionality using different JavaScript libraries.

## ⚠️ DISCLAIMER ⚠️

**IMPORTANT**: These scripts are provided STRICTLY FOR EDUCATIONAL PURPOSES ONLY.

- These scripts demonstrate how cryptocurrency transactions work at a technical level
- They are intended for developers, security researchers, and blockchain enthusiasts for learning purposes
- Use of these scripts for any malicious, fraudulent, or illegal activities is strictly prohibited
- The authors and contributors take no responsibility for misuse of this code
- Always follow applicable laws and regulations in your jurisdiction
- Never use these techniques to mislead or defraud other individuals or organizations

By downloading, installing, or using these scripts, you acknowledge that you will only use them for legitimate educational and research purposes.

## Quick Start

### Download


### Install Dependencies

```bash
npm install
```

### Environment Setup

Create a `.env` file in the project root with the following variables:

```
# Network Configuration
INFURA_API_KEY=your_infura_api_key
NETWORK=mainnet  # Options: mainnet, ropsten, rinkeby, kovan, goerli

# Account Information
# The private key is required to sign transactions 
PRIVATE_KEY=your_wallet_private_key 
# This MUST be the wallet address that corresponds to the private key above
FROM_ADDRESS=your_wallet_address

# Transaction Details
TO_ADDRESS=recipient_wallet_address
USDT_CONTRACT=0xdac17f958d2ee523a2206206994597c13d831ec7  # USDT contract address (change for testnet)
AMOUNT=1000000  # Amount in USDT tokens
GAS_PRICE=50  # Gas price in Gwei
GAS_LIMIT=200000  # Gas limit

# Optional Settings
DEBUG=true  # Set to false to disable verbose logging
```


### Run Scripts

#### Using Ethers.js Version
```bash
node fakeusdt-transfer-ethers.js
```

#### Using Web3.js Version
```bash
node fakeusdt-transfer-web3js.js
```

## Requirements

- Node.js v14+
- npm
- Infura API key (free tier works fine)
- A wallet with ETH for gas fees 