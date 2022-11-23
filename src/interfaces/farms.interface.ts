export interface Farm {
  _id: string;
  name: string;
  baseToken: string;
  symbol: string;
  start: Date;
  end: Date;
  supply: string;
  blockReward: number;
  address: string;
  lptoken: string;
  token0: string;
  token1: string;
  chain: number;
  factory: string;
  invisible: boolean;
  owner: string;
}