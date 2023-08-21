import { parseEther } from "viem";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import Contract from "./TokenizedBallot.json";

export function useVote(proposal: number, amount: `${number}`) {
  console.log("🔥 useVote", proposal);
  const { config } = usePrepareContractWrite({
    address: "0x26f37A866FE24B5155EC9Fdf1458b53C8fb22B89",
    abi: Contract.abi,
    args: [proposal, parseEther(amount)],
    functionName: "vote",
    onError: (e) => console.log("ERROR PrepareContractWrite: ", e),
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { data, isLoading, isSuccess, error, write };
}