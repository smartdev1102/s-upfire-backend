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
  balance: {
    type: String
  },
  rewardToken: {
    type: String 
  },
  stakeToken: {
    type: String
  },
  chain: {
    type: Number
  }
});

const poolModel = model<Pool & Document>('Pool', poolSchema);

export default poolModel;