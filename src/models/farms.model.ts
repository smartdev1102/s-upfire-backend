import { Farm } from "@/interfaces/farms.interface";
import { Document, model, Schema } from "mongoose";


const farmSchema: Schema = new Schema({
  name: {
    type: String
  },
  baseToken: {
    type: String 
  },
  symbol: {
    type: String 
  },
  start: {
    type: Date
  },
  end: {
    type: Date
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
  },
  factory: {
    type: String
  },
  invisible: {
    type: Boolean
  },
  owner: {
    type: String
  }
});

const farmModel = model<Farm & Document>('Farm', farmSchema);

export default farmModel;