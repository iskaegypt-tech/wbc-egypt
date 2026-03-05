import { useEffect, useState } from "react";
import supabase from "../lib/supabaseClient";

export default function Fighters() {

  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchFighters() {

      const { data, error } = await supabase
        .from("fighters")
        .select("*");

      if (error) {
        console.log(error);
        setError(error.message);
      } else {
        setFighters(data);
      }

      setLoading(false);
    }

    fetchFighters();

  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{padding:"40px"}}>
      <h1>Fighters</h1>

      {fighters.map((f) => (
        <div key={f.id}>
          {f.photo_url && (
            <img src={f.photo_url} width="150" />
          )}
          <p>{f.full_name}</p>
        </div>
      ))}

    </div>
  );
}
