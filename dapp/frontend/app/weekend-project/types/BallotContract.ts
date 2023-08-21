export type BallotContract = {
  address: string;
  targetBlockNumber: number;
  deployTransactionHash?: string;
  proposals: {
    title: string;
    votes: number;
  }[];
  tokenContractAddress: string;
  tokenContractDecimals: number;
};