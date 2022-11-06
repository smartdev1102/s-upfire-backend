import { CreateFarmDto } from "@/dtos/farms.dto";
import { HttpException } from "@/exceptions/HttpException";
import { Farm } from "@/interfaces/farms.interface";
import farmModel from "@/models/farms.model";
import { isEmpty } from "class-validator";



class FarmService {
  public farms = farmModel;
  public async findAllFarms(chain: number): Promise<Farm[]> {
    const farms: Farm[] = await this.farms.find({chain: chain});
    return farms;
  }

  public async createFarm (farmData: CreateFarmDto): Promise<Farm> {
    if (isEmpty(farmData)) throw new HttpException(400, "farmData is empty");
    const createfarmData: Farm = await this.farms.create(farmData);
    return createfarmData;
  }

  public async visibleFarm(farmId: string, flag: boolean): Promise<Farm> {
    const findFarm = await this.farms.findById(farmId);
    if(!findFarm) throw new HttpException(400, "Wrong farm");
    const updatedFarm: Farm = await this.farms.findByIdAndUpdate(farmId, {invisible: flag}, {returnOriginal: false});
    return updatedFarm;
  }
}

export default FarmService;