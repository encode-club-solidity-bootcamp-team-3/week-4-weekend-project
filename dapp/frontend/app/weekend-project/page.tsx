"use client";

import { useState } from "react";
import "../globals.css";
import { BallotContract as IBallotContract } from "./types/BallotContract";
import { BallotContract } from "./ballot/BallotContract";
import { TokenContract as ITokenContract } from "./types/TokenContract";
import { TokenContract } from "./token/TokenContract";
import { WalletInfo } from "./wallet/WalletInfo";

export default function Page() {
  const [ballotContract, setBallotContract] = useState<IBallotContract>();
  const [tokenContract, setTokenContract] = useState<ITokenContract>();

  const handleChangeBallotContract = (contract: IBallotContract) =>
    setBallotContract(contract);

  const handleChangeTokenContract = (contract: ITokenContract) =>
    setTokenContract(contract);

  return (
    <main className="px-16 flex gap-2 justify-between">
      <div className="w-1/2">
        <BallotContract onChange={handleChangeBallotContract} />
      </div>
      <div className="w-1/2 flex flex-col gap-2">
        {ballotContract && (
          <>
            <TokenContract
              contractAddress={ballotContract.tokenContractAddress}
              onChange={handleChangeTokenContract}
            />
            {tokenContract && (
              <WalletInfo
                ballotContract={ballotContract}
                tokenContract={tokenContract}
              />
            )}
          </>
        )}
      </div>
    </main>
  );
}
