import { IsNumber, IsString } from "class-validator";


export class CreatePoolDto {
  @IsString()
  public name: string;
  @IsNumber()
  public apr: number;
  @IsString()
  public owner: string;
  @IsString()
  public rewardToken: string;
  @IsString()
  public stakeToken: string;
  @IsNumber()
  public chain: number;
  @IsString()
  public address: string;
}