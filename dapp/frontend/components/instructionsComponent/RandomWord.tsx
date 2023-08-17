import { useEffect, useState } from "react";

function RandomWord() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://randomuser.me/api/")
      .then((res) => res.json())
      .then((data) => {
        setData(data.results[0]);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <div>
      <h1>
        Name: {data.name.title} {data.name.first} {data.name.last}
      </h1>
      <p>Email: {data.email}</p>
    </div>
  );
}
