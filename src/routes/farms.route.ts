import { Router } from 'express';
import FarmsController from '@controllers/farms.controller';
import { CreateFarmDto } from '@dtos/farms.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class FarmsRoute implements Routes {
  public path = '/farms';
  public router = Router();
  public farmsController = new FarmsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:chain`, this.farmsController.getFarms);
    this.router.post(`${this.path}/:chain`, this.farmsController.createFarm);
  }
}

export default FarmsRoute;
