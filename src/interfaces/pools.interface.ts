export interface Pool {
  _id: string;
  name: string;
  apr: number;
  owner: string;
  balance: string;
  rewardToken: string;
  stakeToken: string;
  chain: number;
}