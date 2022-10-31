import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateFarmDto {
  @IsString()
  public name: string;
  @IsString()
  public baseToken: string;
  @IsString()
  public symbol: string;
  @IsDate()
  public start: Date;
  @IsDate()
  public end: Date;
  @IsString()
  public supply: string;
  @IsNumber()
  public blockReward: number;
  @IsString()
  public address: string;
  @IsString()
  public lptoken: string;
  @IsString()
  public rewardToken: string;
  @IsString()
  public token0: string;
  @IsString()
  public token1: string;
  @IsNumber()
  public chain: number;
}