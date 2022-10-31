import { CreatePoolDto } from "@/dtos/pools.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Pool } from "@interfaces/pools.interface";
import poolModel from "@/models/pools.model";
import { isEmpty } from "class-validator";



class PoolService {
  public pools = poolModel;
  public async findAllPools(chain: number): Promise<Pool[]> {
    const pools: Pool[] = await this.pools.find({chain: chain});
    return pools;
  }

  public async createPool (poolData: CreatePoolDto): Promise<Pool> {
    if (isEmpty(poolData)) throw new HttpException(400, "poolData is empty");
    const createpoolData: Pool = await this.pools.create(poolData);
    return createpoolData;
  }
}

export default PoolService;