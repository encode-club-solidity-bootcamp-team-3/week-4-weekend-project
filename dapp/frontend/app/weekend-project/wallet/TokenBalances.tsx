import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { TokenContract as ITokenContract } from "../types/TokenContract";
import { BallotContract as IBallotContract } from "../types/BallotContract";

interface Props {
  ballotContract: IBallotContract;
  tokenContract: ITokenContract;
}

export function TokenBalances({ ballotContract, tokenContract }: Props) {
  const { address: walletAddress, isDisconnected } = useAccount();

  if (isDisconnected || !walletAddress) return null;

  const [data, setData] = useState<{
    balance: number;
    votes: number;
    pastVotes: number;
    decimals: number;
    symbol: string;
  }>();

  const [data2, setData2] = useState<{
    votingPower: number;
  }>();

  useEffect(() => {
    fetch(
      `http://localhost:3001/token-contract/${tokenContract.address}/balances-of/${walletAddress}?targetBlockNumber=${ballotContract.targetBlockNumber}`
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));

    fetch(
      `http://localhost:3001/ballot-contract/${ballotContract.address}/voting-power/${walletAddress}`
    )
      .then((response) => response.json())
      .then((data) => setData2(data))
      .catch((error) => console.log(error));
  }, [walletAddress]);

  return data ? (
    <>
      <p>
        Token balance: {data.balance / 10 ** data.decimals} {data.symbol}
      </p>
      <p>Votes: {data.votes / 10 ** data.decimals}</p>
      <p>Past votes: {data.pastVotes / 10 ** data.decimals}</p>
      {data2 && <p>Voting power: {data2.votingPower / 10 ** data.decimals}</p>}
    </>
  ) : (
    <p>Loading...</p>
  );
}
