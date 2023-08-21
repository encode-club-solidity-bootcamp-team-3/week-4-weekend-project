import { useVote } from "./useVote";

export function Vote({ proposal, onVote }: { proposal: number; onVote: () => void }) {
  console.log("🔥 Vote", proposal);

  const amount = "0.1";

  const { data, error, isLoading, isSuccess, write } = useVote(
    proposal,
    amount
  );

  const handleClick = () => write?.();

  if (isSuccess) onVote();

  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-700 text-white rounded self-start"
        onClick={handleClick}
        disabled={!write || isLoading}
      >
        {isLoading ? "Voting..." : `Vote with ${amount} tokens`}
      </button>
      {isSuccess && (
        <span>
          {" "}
          ✅{" "}
          <a
            className="underline text-blue-500"
            href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
            target="_blank"
          >
            see tx
          </a>
        </span>
      )}
      {error && (
        <div>
          <p>Error! ❌</p>
          <p>{JSON.stringify(error)}</p>
        </div>
      )}
    </div>
  );
}
