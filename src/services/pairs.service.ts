import { Pair } from "@/interfaces/pairs.interface";
import pairModel from "@/models/pairs.model";



class PairService {
  public pairs = pairModel;

  public async findPairByChain(chain: number): Promise<Pair[]> {
    const pairs: Pair[] = await this.pairs.find({chain: chain});
    console.log(pairs)
    return pairs;
  } 
}

export default PairService;