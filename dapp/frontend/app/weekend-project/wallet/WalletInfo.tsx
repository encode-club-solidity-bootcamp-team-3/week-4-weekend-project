import { useAccount } from "wagmi";
import { SelfDelegate } from "../token/SelfDelegate";
import { BallotContract } from "../types/BallotContract";
import { TokenContract as ITokenContract } from "../types/TokenContract";
import { TokenBalances } from "./TokenBalances";
import { WalletBalance } from "./WalletBalance";

interface Props {
  ballotContract: BallotContract;
  tokenContract: ITokenContract;
}

export function WalletInfo({ ballotContract, tokenContract }: Props) {
  const { isConnecting, isDisconnected } = useAccount();
  return (
    <div className="border-4 rounded-xl p-2">
      <h2 className="text-2xl">Wallet</h2>
      <div className="mt-3">
        {isDisconnected ? (
          <p>Wallet disconnected. Connect wallet to continue</p>
        ) : isConnecting ? (
          <p>Loading...</p>
        ) : (
          <>
            <h3 className="text-2xl">Info</h3>
            <div className="p-2 bg-gray-100 rounded-xl flex flex-col gap-1">
              <WalletBalance />
              <TokenBalances
                ballotContract={ballotContract}
                tokenContract={tokenContract}
              />
            </div>
            <h3 className="text-2xl">Actions</h3>
            <div className="mt-3 flex flex-col gap-2">
              <SelfDelegate />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
