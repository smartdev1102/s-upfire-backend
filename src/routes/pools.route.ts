import { Router } from 'express';
import PoolsController from '@/controllers/pools.controller';
import { CreatePoolDto } from '@dtos/pools.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class PoolsRoute implements Routes {
  public path = '/pools';
  public router = Router();
  public poolsController = new PoolsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:chain`, this.poolsController.getPools);
    this.router.post(`${this.path}`, this.poolsController.createPool);
    this.router.put(`${this.path}/invisible`, this.poolsController.visiblePool);
  }
}

export default PoolsRoute;
