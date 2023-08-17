import { useState } from "react";

export function RequestTokens({ address }: { address: string }) {
  const [data, setData] = useState<{ hash: string }>();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    console.log("🔥 handleClick");
    setIsLoading(true);
    fetch("http://localhost:3001/mint-tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        amount: 1,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  };

  if (isLoading) return <p>Requesting tokens from API...</p>;

  if (!data)
    return (
      <div>
        <button onClick={handleClick}>Request Tokens</button>
      </div>
    );

  return <p>Request Tokens tx hash = {data.hash}</p>;
}
