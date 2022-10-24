const cron = require("node-cron");
const mongoose = require("mongoose");
const ethers = require("ethers");
const pairsModel = require("./PairsModel");
const { swapFactory, pair, tokenContract } = require("./ethers.util");


mongoose
  .connect("mongodb://localhost:27017/upfire")
  .then(res => {
    console.log("mongoose connected successfully")
  })
  .catch(err => {
    console.error(err)
  })
cron.schedule("0 */1 * * *", async () => {
  console.log("fetch pairs");
  // get pairs on chain 97
  await getPairs(97);
  await getPairs(43113);
  await getPairs(4);
});

async function getPairs(chain) {
  try {
    const pairsLength = await swapFactory(chain).allPairsLength();
    for (let i = 0; i < Number(pairsLength); i++) {
      const pairAddress = await swapFactory(chain).allPairs(i);
      const token0 = await pair(chain, pairAddress).token0();
      const token1 = await pair(chain, pairAddress).token1();
      const symbol1 = await tokenContract(chain, token0).symbol();
      const symbol2 = await tokenContract(chain, token1).symbol();
      pairsModel.insertData(
        {
          address: pairAddress,
          symbol1: symbol1,
          symbol2: symbol2,
          chain: chain
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
}