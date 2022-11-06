const cron = require("node-cron");
const mongoose = require("mongoose");
const pairsModel = require("./PairsModel");
const farmsModel = require("./FarmsModel");
const ethers = require("ethers");
const { swapFactory, pair, tokenContract, address, factory, farm, swapFactories } = require("./ethers.util");


mongoose
  .connect("mongodb://localhost:27017/upfire")
  .then(res => {
    console.log("mongoose connected successfully")
  })
  .catch(err => {
    console.error(err)
  })
cron.schedule("* * * * *", async () => {
  console.log("fetch pairs");
  // get pairs on chain 56
  await getPairs(97, 0);
  await getPairs(43114, 0);
  await getPairs(43114, 1);
});

async function getPairs(chain, index) {
  try {
    const pairsLength = await swapFactory(chain, index).allPairsLength();
    for (let i = 0; i < Number(pairsLength); i++) {
      const pairAddress = await swapFactory(chain, index).allPairs(i);
      const token0 = await pair(chain, pairAddress).token0();
      const token1 = await pair(chain, pairAddress).token1();
      const symbol1 = await tokenContract(chain, token0).symbol();
      const symbol2 = await tokenContract(chain, token1).symbol();
      pairsModel.insertData(
        {
          address: pairAddress,
          symbol1: symbol1,
          symbol2: symbol2,
          chain: chain,
          factory: swapFactories[chain][index]['uniswap']
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}

