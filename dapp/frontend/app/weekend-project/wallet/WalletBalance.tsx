"use client";

import { useAccount, useBalance } from "wagmi";

export function WalletBalance() {
  const { address, isDisconnected } = useAccount();

  if (isDisconnected || !address) return null;

  const { data, isError, isLoading } = useBalance({ address });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance</div>;

  return (
    <p>
      Currency balance: {data?.formatted} {data?.symbol}
    </p>
  );
}
