import { useEffect, useState } from "react";

export function TokenAddressFromApi() {
  const [data, setData] = useState<{ address: string }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/contract-address")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading token address from API</p>;

  if (!data) return <p>did not retrieved any token address from API</p>;

  return <p>Token address from API = {data.address}</p>;
}
