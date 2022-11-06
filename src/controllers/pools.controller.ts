import { NextFunction, Request, Response } from 'express';
import { CreatePoolDto } from '@dtos/pools.dto';
import { Pool } from '@interfaces/pools.interface';
import poolService from '@services/pools.service';

class PoolsController {
  public poolService = new poolService();

  public getPools = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chain = Number(req.params.chain);
      const findAllPoolsData: Pool[] = await this.poolService.findAllPools(chain);

      res.status(200).json({ data: findAllPoolsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createPool = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poolData: CreatePoolDto = req.body;
      const createPoolData: Pool = await this.poolService.createPool(poolData);

      res.status(201).json({ data: createPoolData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public visiblePool = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const poolId = req.body.id;
      const flag = req.body.invisible;
      const updatedPool: Pool = await this.poolService.visiblePool(poolId, flag);

      res.status(201).json({data: updatedPool, message: 'updated'});
    } catch (error) {
      next(error);
    }
  }
}

export default PoolsController;
