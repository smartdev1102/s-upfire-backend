import { Document, model, Schema } from "mongoose";
import { Pair } from "@/interfaces/pairs.interface";


const pairSchema: Schema = new Schema ({
  address: {
    type: String
  },
  symbol1: {
    type: String
  },
  symbol2: {
    type: String
  },
  chain: {
    type: Number
  },
  factory: {
    type: String
  }
});

const pairModel = model<Pair & Document>('Pair', pairSchema);

export default pairModel;