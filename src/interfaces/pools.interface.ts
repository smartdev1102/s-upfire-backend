export interface Pool {
  _id: string;
  name: string;
  apr: number;
  owner: string;
  rewardToken: string;
  stakeToken: string;
  chain: number;
  address: string;
}