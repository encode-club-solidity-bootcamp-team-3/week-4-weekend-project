import { useSelfDelegate } from "./useSelfDelegate";

export function SelfDelegate() {
  const {data, error, isLoading, isSuccess, write } = useSelfDelegate();

  const handleClick = () => write?.();

  return (
    <div>
      <button
        className="px-2 py-1 bg-gray-700 text-white rounded self-start"
        onClick={handleClick}
        disabled={!write || isLoading}
      >
        {isLoading ? "Self delegating..." : "Self delegate"}
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