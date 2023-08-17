"use client";

import { useAccount, useNetwork } from "wagmi";
import { WalletAction } from "./WalletAction";
import { WalletBalance } from "./WalletBalance";
import { TokenName } from "./TokenName";
import { TokenBalance } from "./TokenBalance";
import { RequestTokens } from "./RequestTokens";

export function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  
  if (address)
    return (
      <div>
        <p>Your account address is {address}</p>
        <p>Connected to the network {chain?.name}</p>
        <WalletAction />
        <TokenBalance address={address} />
        <TokenName />
        <WalletBalance address={address} />
        <RequestTokens address={address} />
      </div>
    );
  if (isConnecting) return <p>Loading...</p>;
  if (isDisconnected)
    return <p>Wallet disconnected. Connect wallet to continue</p>;
  return <p>Connect wallet to continue</p>;
}
