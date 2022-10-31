import { Pair } from "@/interfaces/pairs.interface";
import pairModel from "@/models/pairs.model";



class PairService {
  public pairs = pairModel;

  public async findPairByChain(chain: number, factory: string): Promise<Pair[]> {
    const pairs: Pair[] = await this.pairs.find({chain: chain, factory: factory});
    console.log(pairs)
    return pairs;
  } 
}

export default PairService;