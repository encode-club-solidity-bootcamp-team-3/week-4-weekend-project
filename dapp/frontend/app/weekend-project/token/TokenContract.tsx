import { useState } from "react";
import { TokenContract as ITokenContract } from "../types/TokenContract";

interface Props {
  contractAddress: string;
  onChange: (contract: ITokenContract) => void;
}

export function TokenContract({ contractAddress, onChange }: Props) {
  const [contract, setContract] = useState<ITokenContract>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const loadContract = async () => {
    try {
      setIsLoading(true);
      setContract(undefined);
      setError(undefined);
      const response = await fetch(
        `http://localhost:3001/token-contract/${contractAddress}`
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

  return (
    <div className="border-4 rounded-xl p-2">
      <h2 className="text-2xl">Token Contract</h2>
      <div className="mt-3">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {contract && (
          <div className="p-2 bg-gray-100 rounded-xl flex flex-col gap-1">
            <p>Address: {contract.address}</p>
            <p>Name: {contract.name}</p>
            <p>Symbol: {contract.symbol}</p>
            {contract.deployTransactionHash && (
              <p>Deploy transaction hash: {contract.deployTransactionHash}</p>
            )}
            <div className="flex flex-col">
              <p>Decimals: {contract.decimals}</p>
              <p>
                Total suply: {contract.totalSupply / 10 ** contract.decimals}
              </p>
            </div>
          </div>
          // <MintTo />
          // <Delegate />
        )}
      </div>
    </div>
  );
}
