import { NextFunction, Request, Response } from 'express';
import { CreateFarmDto } from '@dtos/farms.dto';
import { Farm } from '@interfaces/farms.interface';
import farmService from '@services/farms.service';

class FarmsController {
  public farmService = new farmService();

  public getFarms = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chain = Number(req.params.chain);
      const findAllFarmsData: Farm[] = await this.farmService.findAllFarms(chain);

      res.status(200).json({ data: findAllFarmsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public createFarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmData: CreateFarmDto = req.body;
      const createFarmData: Farm = await this.farmService.createFarm(farmData);

      res.status(201).json({ data: createFarmData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public visibleFarm = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const farmId = req.body.id;
      const flag = req.body.invisible
      const updatedFarm: Farm = await this.farmService.visibleFarm(farmId, flag);

      res.status(201).json({data: updatedFarm, message: 'updated'});
    } catch (error) {
      next(error);
    }
  }
  
}

export default FarmsController;
