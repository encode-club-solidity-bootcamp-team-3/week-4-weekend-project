import styles from "./instructionsComponent.module.css";
import { useAccount, useNetwork, useBalance, useSignMessage, useContractRead } from "wagmi"; 
import { useEffect, useState } from "react";

import tokenJson from '../../../../api/src/assets/MyToken.json';
import ballotJson from '../../../../api/src/assets/TokenizedBallot.json';


export default function InstructionsComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            Voting dApp
          </h1>
          <h3>Week 4 - Remi, Stefan and Jordi</h3>
          <p>Mint tokens, self delegate, vote and see balance, all in Sepolia network.</p>
        </div>
      </header>
      <WalletInfo></WalletInfo>
      <PageBody></PageBody>
    </div>
  );
}

function PageBody() {
  const { address } = useAccount();

  return (
    <div className={styles.buttons_container}> 
      <MintTokens address={address}></MintTokens>
      <DelegateVote address={address}></DelegateVote>
      <Vote></Vote> 
    </div>
  )
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();
  if (address)
    return (
      <div>
        <p>Your account address is {address}.</p>
        <p>Connected to {chain?.name} network.</p>
        <WalletBalance address={address}></WalletBalance>
        <TokenName></TokenName>
        <TokenBalance address={address}></TokenBalance>
        <SeeVotingPower address={address}></SeeVotingPower>
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Connecting wallet...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue.</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue.</p>
    </div>
  );
}

function WalletBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useBalance({
    address: params.address,
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (isError) return <div>Error fetching balance.</div>;
  return (
    <div>
      <p>Balance: <b>{data?.formatted} {data?.symbol}</b></p>
    </div>
  );
}

function TokenName() {
  const { data, isError, isLoading } = useContractRead({
    address: "0x208F75C3A395Ad125D0D641D9a2648F837a58538",
    abi: tokenJson.abi,
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <p>Fetching name…</p>;
  if (isError) return <p>Error fetching name.</p>;
  return <p>Token name: {name}</p>;
}

function TokenBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useContractRead({
    address: "0x208F75C3A395Ad125D0D641D9a2648F837a58538",
    abi: tokenJson.abi,
    functionName: "balanceOf",
    args: [params.address],
  });

  const balance = typeof data === "bigint" ? data : 0;

  if (isLoading) return <p>Fetching balance...</p>;
  if (isError) return <p>Error fetching balance.</p>;
  return <p>Token balance: <b>{Number(balance)}</b> decimal units.</p>;
}

function SeeVotingPower(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useContractRead({
    address: "0x83611D5d1E4efc8c74B86090aA9CD304889d854a",
    abi: ballotJson.abi,
    functionName: "votingPower",
    args: [params.address],
  });

  const votePower = typeof data === "bigint" ? data : 0;

  if (isLoading) return <p>Fetching voting power...</p>
  if (isError) return <p>Error fetching voting power.</p>
  return <p>Voting power: <b>{Number(votePower)}</b></p>
}

function DelegateVote(params: { address: `0x${string}` | undefined }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ address: params.address })
  };

  if (isLoading) return (
    <div className={styles.button}>
      Delegating votes with API...
    </div>
  )

  if (!data) return <p>
    <button
        disabled={isLoading}
        className={styles.button}
        style={{ backgroundColor: 'black', color: 'white' }}
        onClick={() => {
          setLoading(true);
          fetch("http://localhost:3001/self-delegate", requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          });
        }}
    >
      Delegate Votes
    </button>
  </p>;

  const hash = String(data.txHash);
  const ETHScanLink = "https://sepolia.etherscan.io/tx/" + hash;
  const shortHash = hash.slice(0,5) + "..." + hash.slice(-3)

  return (
    <div className={styles.button}>
      Tx hash: <a href={ETHScanLink}
        target="_blank"
        rel="noreferrer noopener"
      >
        {shortHash}
      </a>
    </div>
  )
}

function Vote() {
  return (
    <button className={styles.button} style={{ backgroundColor: 'black', color: 'white' }}>
 Vote
</button>
  )
}
 

function MintTokens(params: { address: `0x${string}` | undefined }) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ address: params.address })
  };

  if (isLoading) return (
    <div className={styles.button}>
      Requesting tokens from API...
    </div>
  )

  if (!data) return <p>
    <button
        disabled={isLoading}
        className={styles.button} style={{ backgroundColor: 'black', color: 'white' }}
        onClick={() => {
          setLoading(true);
          fetch("http://localhost:3001/mint-tokens", requestOptions)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setLoading(false)
          });
        }}
    >
      Request Tokens
    </button>
  </p>;

  const hash = String(data.txHash);
  const ETHScanLink = "https://sepolia.etherscan.io/tx/" + hash;
  const shortHash = hash.slice(0,5) + "..." + hash.slice(-3)

  return (
    <div className={styles.button}>
      Tx hash: <a href={ETHScanLink}
        target="_blank"
        rel="noreferrer noopener"
      >
        {shortHash}
      </a>
    </div>
  )
}
