import { Pool } from "@/interfaces/pools.interface";
import { Document, model, Schema } from "mongoose";


const poolSchema: Schema = new Schema({
  name: {
    type: String
  },
  apr: {
    type: Number 
  },
  owner: {
    type: String 
  },
  rewardToken: {
    type: String 
  },
  stakeToken: {
    type: String
  },
  rewardPerBlock: {
    type: Number
  },
  supply: {
    type: Number
  },
  chain: {
    type: Number
  },
  address: {
    type: String
  },
  start: {
    type: Date
  },
  end: {
    type: Date
  },
  rewardSymbol: {
    type: String
  },
  invisible: {
    type: Boolean
  }
});

const poolModel = model<Pool & Document>('Pool', poolSchema);

export default poolModel;