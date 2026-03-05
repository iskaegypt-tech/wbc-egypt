import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Fighters() {

  const [fighters, setFighters] = useState([]);

  useEffect(() => {
    getFighters();
  }, []);

  async function getFighters() {

    const { data, error } = await supabase
      .from("fighters")
      .select("*");

    if (error) {
      console.log("ERROR:", error);
    } else {
      console.log("DATA:", data);
      setFighters(data);
    }
  }

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h1>Fighters</h1>

      <table border="1" cellPadding="10" style={{width:"100%"}}>
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
              <td>{fighter.full_name}</td>
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
