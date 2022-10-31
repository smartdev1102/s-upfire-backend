const ethers = require("ethers");
const { networks } = require("./network") 
const Factory = require('./contracts/Factory.sol/Factory.json');
const Generator = require('./contracts/FarmGenerator.sol/FarmGenerator.json');
const Farm = require('./contracts/Farm.sol/Farm.json');
const SwapFactory = require('./contracts/interfaces/IUniFactory.sol/IUniFactory.json');
const Pair = require('./contracts/interfaces/IUniswapV2Pair.sol/IUniswapV2Pair.json');
const Router = require('./contracts/interfaces/IUniswapV2Router01.sol/IUniswapV2Router01.json');
const Pool = require('./contracts/interfaces/pool/IUniswapV3PoolImmutables.sol/IUniswapV3PoolImmutables.json');
const SFactory = require('./contracts/PoolFactory.sol/PoolFactory.json');
const SGenerator = require('./contracts/PoolGenerator.sol/PoolGenerator.json');
const SPool = require('./contracts/Pool.sol/Pool.json');



const address = {
  56: {
    0: {
      factory: '0x63Abf57Bd3773901De3ec9FaF49D824B67d233CC',
      generator: '0xb463f85621cCAC9f7178eA72CAAA27941849f738'
    }
  },
  97: {
    0: {
      factory: "0xDb9ADc1D6ED67B3f599c7706478342bCF2577411",
      generator: "0xddf3b2233ba2B667c2f68eE9D863Ab288C6838d6",
      rewardToken: "0x2A84A252b129489Bc7834B483a4Ba370cA403F19",
      wether: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
      sfactory: '0x336227924a7187411E64BDA693AE266C5be1C99d',
      sgenerator: '0x719475e78A5C0661198E673c517cEDe900a5E7b9'
    } 
  },
  43114: {
    0: {
      factory: '0xafdC15eD96544f4Dc7bB3997f723A3F333eEE994',
      generator: '0xfeaB072417019a9b2Dc1c6940c31845354a3d0E7'
    },
    1: {
      factory: '0x0100e4D763bA57C0DCAa5E3D4cBb5A51f65e2846',
      generator: '0x3fa9b82Dd7db611242b6B0C67EaC1bb580F2259e'
    }
  }
}

const coinSymbols = {
  97: 'BNB',
  43114: 'AVAX',
  4: 'ETHER',
  56: 'BNB'
}

const swapFactories = {
  97: {
    0: {
      uniswap: "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
      router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
    }
  },
  43114: {
    0: {
      uniswap: "0xefa94DE7a4656D787667C749f7E1223D71E9FD88",
      router: '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106'
    },
    1: {
      uniswap: "0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10",
      router: '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
    }
  },
  4: {
    uniswap: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'
  },
  56: {
    0: {
      uniswap: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      router: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
    }
  }
}
// providers



const factory = (chain, index) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  return new ethers.Contract(address[chain][index]['factory'], Factory.abi, provider);
}
const factoryWeb3 = (chain, signer, index) => {
  return new ethers.Contract(address[chain][index]['factory'], Factory.abi, signer);
}

const generator = (chain, index) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  return new ethers.Contract(address[chain][index]['generator'], Generator.abi, provider);
}
const generatorWeb3 = (chain, signer, index) => {
  return new ethers.Contract(address[chain][index]['generator'], Generator.abi, signer);
}


const swapFactory = (chain, index) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  return new ethers.Contract(swapFactories[chain][index]['uniswap'], SwapFactory.abi, provider);
}

const pair = (chain, pairAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  return new ethers.Contract(pairAddress, Pair.abi, provider);
}

const pool = (chain, poolAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  return new ethers.Contract(poolAddress, Pool.abi, provider);
}

const routerWeb3 = (chain, signer) => {
  const contract = new ethers.Contract(swapFactories[chain]['router'], Router.abi, signer);
  return contract;
}

const farm = (chain, farmAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  const contract = new ethers.Contract(farmAddress, Farm.abi, provider);
  return contract;
}

const farmWeb3 = (farmAddress, signer) => {
  const contract = new ethers.Contract(farmAddress, Farm.abi, signer);
  return contract;
}

const tokenContract = (chain, tokenAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  const contract = new ethers.Contract(tokenAddress, erc20Abi, provider);
  return contract;
}

const tokenWeb3 = (tokenAddress, signer) => {
  const contract = new ethers.Contract(tokenAddress, erc20Abi, signer);
  return contract;
}

// staking pool

const sfactory = (chain) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  const contract = new ethers.Contract(address[chain]['sfactory'], SFactory.abi, provider);
  return contract;
}

const sfactoryWeb3 = (chain, signer) => {
  const contract = new ethers.Contract(address[chain]['sfactory'], SFactory.abi, signer);
  return contract;
}

const sgenerator = (chain) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  const contract = new ethers.Contract(address[chain]['sgenerator'], SGenerator.abi, provider);
  return contract;
}

const sgeneratorWeb3 = (chain, signer) => {
  const contract = new ethers.Contract(address[chain]['sgenerator'], SGenerator.abi, signer);
  return contract;
}

const spool = (chain, poolAddress) => {
  const provider = new ethers.providers.JsonRpcProvider(networks[chain].rpcUrls[0]);
  const contract = new ethers.Contract(poolAddress, SPool.abi, provider);
  return contract;
}

const spoolWeb3 = (poolAddress, signer) => {
  const contract = new ethers.Contract(poolAddress, SPool.abi, signer);
  return contract;
}


const erc20Abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  }
]

module.exports = {
  swapFactory,
  address,
  pair,
  tokenContract,
  factory,
  farm,
  swapFactories
}