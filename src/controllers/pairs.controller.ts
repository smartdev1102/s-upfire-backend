import { Pair } from "@/interfaces/pairs.interface";
import PairService from "@/services/pairs.service";
import { NextFunction, Request, Response } from "express";



class PairsController {
  public pairServie = new PairService();

  public getPairsByChain = async (req: Request, res: Response, next: NextFunction) => {
    const chain: number = Number(req.params.chain);
    const factory: string = req.params.factory;
    const pairs: Pair[] = await this.pairServie.findPairByChain(chain, factory);
    res.status(200).json(pairs);
  }
}

export default PairsController;