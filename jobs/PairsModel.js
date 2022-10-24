const mongoose = require("mongoose")
const pairsSchema = new mongoose.Schema({
  address: {
    type: String,
  },
  symbol1: {
    type: String,
  },
  symbol2: {
    type: String,
  },
  chain: {
    type: Number
  }
})
class Pairs {
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
    const findone = await this.find({chain: data.chain, address: data.address});
    console.log(findone)
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
pairsSchema.loadClass(Pairs)
module.exports = mongoose.model("Pairs", pairsSchema)