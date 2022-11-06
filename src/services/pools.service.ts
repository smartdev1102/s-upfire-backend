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

  public async visiblePool(poolId: string, flag: boolean): Promise<Pool> {
    const findPool = await this.pools.findById(poolId);
    if(!findPool) throw new HttpException(400, "Wrong pool");
    const updatedPool: Pool = await this.pools.findByIdAndUpdate(poolId, { invisible: flag}, {returnOriginal: true});
    return updatedPool
  }
}

export default PoolService;