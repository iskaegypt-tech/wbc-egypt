import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FighterProfile() {

  const router = useRouter();
  const { id } = router.query;

  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    if (id) getFighter();
  }, [id]);

  async function getFighter() {

    const { data, error } = await supabase
      .from("fighters")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setFighter(data);
    }
  }

  if (!fighter) return <p style={{padding:"40px"}}>Loading...</p>;

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>

      <h1>{fighter.full_name}</h1>

      <h3>Nickname: {fighter.nickname}</h3>

      <p><b>Nationality:</b> {fighter.nationality}</p>

      <p><b>Weight Class:</b> {fighter.weight_class}</p>

      <p><b>Record:</b> {fighter.wins}-{fighter.losses}-{fighter.draws}</p>

      <hr/>

      <h2>Statistics</h2>

      <p>KO Wins: {fighter.ko_wins}</p>

    </div>
  );
}
