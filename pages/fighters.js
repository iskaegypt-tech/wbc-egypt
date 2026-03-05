import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function Fighters() {

  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    fetchFighters();
  }, []);

  async function fetchFighters() {

    const { data } = await supabase
      .from("fighters")
      .select("*")
      .order("name");

    setFighters(data || []);
  }

  return (

    <div style={{padding:"40px"}}>

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
                <Link href={`/fighter/${fighter.id}`}>
                  {fighter.name}
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
