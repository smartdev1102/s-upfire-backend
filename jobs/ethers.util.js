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
      factory: "0xF854E75B77d92d11579442cd9c36980Ed39fe68d",
      generator: "0x9C2D0018986FEd97c5EFE7569020ea4108646740",
      wether: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      sfactory: "0x1a43abdbb2BDfC5ef3C5B9a92fFed566630C0a7D",
      sgenerator: "0xc00ee850efA214742b548626c0Bc56FFebCa0032",
    },
  },
  97: {
    0: {
      factory: "0x5CD5a6dCf173a4e44CC62dB621C957c4B133E270",
      generator: "0x747e47410DA188885E4717202786490122b9475b",
      rewardToken: "0x75D8D5989fd5df9358adeadDeEC21d04227c2cAA",
      wether: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      sfactory: "0xF1F6771637AF1196F1dDC35C4004D13724858E82",
      sgenerator: "0x5fb78273134a202C9Cf048dFBc8785A5c2B611c1",
    },
  },
  43114: {
    0: {
      factory: "0xafdC15eD96544f4Dc7bB3997f723A3F333eEE994",
      generator: "0xfeaB072417019a9b2Dc1c6940c31845354a3d0E7",
      wether: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
      sfactory: "0x5997c902700D4a35456ee6BEC69699E2F57486F1",
      sgenerator: "0xAa33efd126a446a1F518880bBEA0Ce3a740f5C39",
    },
    1: {
      factory: "0x0100e4D763bA57C0DCAa5E3D4cBb5A51f65e2846",
      generator: "0x3fa9b82Dd7db611242b6B0C67EaC1bb580F2259e",
    },
  },
  4: {
    factory: "0x587a39A679994B9E6BA1F6e29Eb0ebA20Df42abF",
    generator: "0x40275f985d891cd73E5b594faaEb01f99142F46C",
    rewardToken: "0xBd83855cfADe70EDA1f93080c32387d93Dc39BE1",
    sfactory: "0x36f708Cd37f35e9517Be6F1F6D0f3b52b9898799",
    sgenerator: "0x1e10444e7280f1f1A353c5436cfEc2CB27c63F66",
    wether: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
  },
};

const coinSymbols = {
  97: 'BNB',
  43114: 'AVAX',
  4: 'ETHER',
  56: 'BNB'
}

const swapFactories = {
  97: {
    0: {
      "uniswap": "0xc35DADB65012eC5796536bD9864eD8773aBc74C4",
      "router": '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506'
    }
  },
  43114: {
    0: {
      "uniswap": "0xefa94DE7a4656D787667C749f7E1223D71E9FD88",
      "router": '0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106'
    },
    1: {
      "uniswap": "0x9Ad6C38BE94206cA50bb0d90783181662f0Cfa10",
      "router": '0x60aE616a2155Ee3d9A68541Ba4544862310933d4'
    }
  },
  56: {
    0: {
      "uniswap": '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      "router": '0x10ED43C718714eb63d5aA57B78B54704E256024E'
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

const routerWeb3 = (chain, signer, index) => {
  const contract = new ethers.Contract(swapFactories[chain][index]['router'], Router.abi, signer);
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