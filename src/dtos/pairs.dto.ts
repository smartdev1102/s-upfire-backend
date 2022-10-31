import { IsNumber, IsString } from "class-validator";

export class CreatePairDto {
  @IsString()
  public address: string;
  @IsString()
  public symbol1: string;
  @IsString()
  public symbol2: string;
  @IsNumber()
  public chain: number;
  @IsString()
  public factory: string;
}