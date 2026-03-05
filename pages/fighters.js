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
            <th>Name</th>
            <th>Nickname</th>
            <th>Nationality</th>
            <th>Weight Class</th>
            <th>Record</th>
          </tr>
        </thead>

        <tbody>

          {fighters.map((fighter) => (

            <tr key={fighter.id}>

              <td>
                <Link href={`/fighters/${fighter.id}`}>
                  {fighter.full_name}
                </Link>
              </td>

              <td>{fighter.nickname}</td>

              <td>{fighter.nationality}</td>

              <td>{fighter.weight_class}</td>

              <td>
                {fighter.wins}-{fighter.losses}-{fighter.draws}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
