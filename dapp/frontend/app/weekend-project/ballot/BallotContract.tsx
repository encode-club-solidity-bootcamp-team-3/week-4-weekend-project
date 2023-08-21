import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { BallotContract as IBallotContract } from "../types/BallotContract";
import { Vote } from "./Vote";
import { disconnect } from "process";
import { useAccount } from "wagmi";

interface Props {
  onChange: (contract: IBallotContract) => void;
}

export function BallotContract({ onChange }: Props) {
  const [contractAddress, setContractAddress] = useState<string>(
    "0x26f37A866FE24B5155EC9Fdf1458b53C8fb22B89" // you prefer choice
  );
  const [contract, setContract] = useState<IBallotContract>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { isDisconnected, isConnected } = useAccount();

  const loadContract = async () => {
    try {
      setIsLoading(true);
      setContract(undefined);
      setError(undefined);
      const response = await fetch(
        `http://localhost:3001/ballot-contract/${contractAddress}`
      );
      const data = await response.json();
      if (response.status === 200) {
        setContract(data);
        onChange(data);
      } else {
        setError(JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!contract && !isLoading) loadContract();

  const handleLoad = async (e: FormEvent) => {
    e.preventDefault();
    loadContract();
  };

  const handleDeploy = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setContract(undefined);
      const response = await fetch(
        "http://localhost:3001/ballot-contract/deploy",
        { method: "POST" }
      );
      const data = await response.json();
      setContract(data);
      onChange(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-4 rounded-xl p-2">
      <h2 className="text-2xl">Ballot Contract</h2>
      <div className="mt-3 flex flex-col gap-2">
        <form
          onSubmit={handleLoad}
          className="flex gap-2 items-center whitespace-nowrap"
        >
          <button
            className="px-2 py-1 bg-gray-700 text-white rounded"
            disabled={isLoading}
            type="submit"
          >
            Load
          </button>{" "}
          an existing contract
          <input
            className="border rounded px-2 py-1 focus:bg-gray-100 w-full"
            type="text"
            placeholder="Contract address"
            value={contractAddress}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setContractAddress(e.target.value)
            }
          />
        </form>
        {/* <div className="flex gap-2 items-center">
            or{" "}
            <button
              className="px-2 py-1 bg-gray-700 text-white rounded"
              disabled={isLoading}
              onClick={handleDeploy}
            >
              Deploy
            </button>{" "}
            a new contract (using api wallet)
          </div> */}

        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {contract && (
          <div className="p-2 bg-gray-100 rounded-xl flex flex-col gap-1">
            <p>Address: {contract.address}</p>
            <p>Target block number: {contract.targetBlockNumber}</p>
            {contract.deployTransactionHash && (
              <p>Deploy transaction hash: {contract.deployTransactionHash}</p>
            )}
            <div className="flex flex-col gap-2">
              <div>
                <p>Vote for 1 of the following proposal.</p>
                <br />
                <p>You would rather have for the rest of your life:</p>
                {isDisconnected && (
                  <p className="text-red-500">
                    Wallet disconnected. Connect wallet to continue
                  </p>
                )}
                <ol className="flex flex-col gap-1">
                  {contract.proposals.map(({ title, votes }, index) => (
                    <li key={title} className="flex gap-1">
                      <p>
                        {index + 1}. {title}:{" "}
                        {votes / 10 ** contract.tokenContractDecimals} votes
                      </p>
                      {isConnected && (
                        <Vote proposal={index} onVote={() => loadContract()} />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
