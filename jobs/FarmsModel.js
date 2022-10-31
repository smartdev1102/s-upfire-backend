const mongoose = require("mongoose")
const farmsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  baseToken: {
    type: String,
  },
  symbol: {
    type: String,
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  numFarners: {
    type: Number
  },
  supply: {
    type: String
  },
  blockReward: {
    type: Number
  },
  address: {
    type: String
  },
  lptoken: {
    type: String
  },
  rewardToken: {
    type: String
  },
  token0: {
    type: String
  },
  token1: {
    type: String
  }, 
  chain: {
    type: Number
  }
})
class Farms {
  static getRec(date) {
    return this.find({
      recordedDate: {
        $lte: new Date(date),
      },
    }).exec()
  }
  static insertBulkData(data) {
    return this.insertMany(data)
  }
  static async insertData(data) {
    console.log(data);
    const findone = await this.find({chain: data.chain, address: data.address});
    console.log(findone);
    if(findone.length == 0) {
      this.insertMany([data]);
    }
  }
  static archiveData(date) {
    return this.updateMany(
      {
        recordedDate: {
          $lte: new Date(date),
        },
      },
      {
        $set: {
          isArchived: true,
        },
      }
    ).exec()
  }
  static getArchivedData() {
    return this.find({
      isArchived: true,
    }).exec()
  }
}
farmsSchema.loadClass(Farms)
module.exports = mongoose.model("Farms", farmsSchema)