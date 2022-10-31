const cron = require("node-cron");
const mongoose = require("mongoose");
const pairsModel = require("./PairsModel");
const farmsModel = require("./FarmsModel");
const ethers = require("ethers");
const { swapFactory, pair, tokenContract, address, factory, farm } = require("./ethers.util");


mongoose
  .connect("mongodb://localhost:27017/upfire")
  .then(res => {
    console.log("mongoose connected successfully")
  })
  .catch(err => {
    console.error(err)
  })
cron.schedule("0 1 * * *", async () => {
  console.log("getting Farms");
  await getFarms(56, 0);
  await getFarms(43114, 0);
  await getFarms(43114, 1);
});

async function getFarms(chain, index) {
  let farmsLength = await factory(chain, index).farmsLength();
  // get farms v2
  for (let i = 0; i < Number(farmsLength); i++) {
    const farmAddress = await factory(chain, index).farmAtIndex(i);
    const farminfo = await farm(chain, farmAddress).farmInfo();
    const blockReward = farminfo.blockReward;
    const farmSupply = farminfo.farmableSupply;
    const rewardToken = farminfo.rewardToken;
    const lptoken = farminfo.lpToken;
    const startBlock = farminfo.startBlock;
    const endBlock = farminfo.endBlock;
    const start = new Date(startBlock * 1000);
    const end = new Date(endBlock * 1000);
    const numFarmers = farminfo.numFarmers;
    const rewardSymbol = await tokenContract(chain, rewardToken).symbol();
    const token0 = await pair(chain, lptoken).token0();
    const token1 = await pair(chain, lptoken).token1();
    const symbol1 = await tokenContract(chain, token0).symbol();
    const symbol2 = await tokenContract(chain, token1).symbol();
    const lpSymbol = `${symbol1}-${symbol2}`;
    farmsModel.insertData({
      name: lpSymbol,
      baseToken: rewardSymbol,
      symbol: lpSymbol,
      start: start,
      end: end,
      numFarmers: numFarmers.toString(),
      supply: ethers.utils.formatEther(farmSupply),
      blockReward: blockReward.toNumber(),
      address: farmAddress,
      lptoken: lptoken,
      rewardToken: rewardToken,
      token0: token0,
      token1: token1,
      chain: chain
    })
  }
}