export type TokenContract = {
  address: string;
  name: string;
  symbol: string;
  deployTransactionHash?: string;
  decimals: number;
  totalSupply: number;
};