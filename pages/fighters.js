import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabaseClient";

export default function Fighters() {
  const [fighters, setFighters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFighters();
  }, []);

  async function fetchFighters() {
    const { data, error } = await supabase
      .from("fighters")
      .select("*");

    if (error) {
      console.log(error);
    } else {
      setFighters(data);
    }

    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px" }}>
      <h1>Fighters</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Nickname</th>
            <th>Nationality</th>
            <th>Record</th>
          </tr>
        </thead>

        <tbody>
          {fighters.map((fighter) => (
            <tr key={fighter.id}>
              <td>
                {fighter.photo_url && (
                  <img
                    src={fighter.photo_url}
                    width="70"
                    height="70"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </td>

              <td>
                <Link href={`/fighters/${fighter.id}`}>
                  {fighter.name}
                </Link>
              </td>

              <td>{fighter.nickname}</td>
              <td>{fighter.nationality}</td>
              <td>{fighter.record}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
