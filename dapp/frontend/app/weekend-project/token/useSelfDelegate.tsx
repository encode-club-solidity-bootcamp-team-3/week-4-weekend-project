import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import Contract from "./MyToken.json";

export function useSelfDelegate() {
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: "0x1b52602a4916B32f32f8859eD2A8c52168488D40",
    abi: Contract.abi,
    args: [address],
    functionName: "delegate",
    onError: (e) => console.log("ERROR PrepareContractWrite: ", e),
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess, error } = useWaitForTransaction({
    hash: data?.hash,
  });

  return { data, isLoading, isSuccess, error, write };
}