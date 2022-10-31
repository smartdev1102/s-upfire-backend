import { Router } from 'express';
import PairsController from '@controllers/pairs.controller';
import { CreatePairDto } from '@dtos/pairs.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class PairsRoute implements Routes {
  public path = '/pairs';
  public router = Router();
  public pairsController = new PairsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:chain/:factory`, this.pairsController.getPairsByChain);
  }
}

export default PairsRoute;
