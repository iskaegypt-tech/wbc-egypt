import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function FighterPage() {

  const router = useRouter();
  const { id } = router.query;

  const [fighter, setFighter] = useState(null);

  useEffect(() => {
    if (id) fetchFighter();
  }, [id]);

  async function fetchFighter() {

    const { data, error } = await supabase
      .from("fighters")
      .select("*")
      .eq("id", id)
      .single();

    if (!error) {
      setFighter(data);
    }
  }

  if (!fighter) return <p>Loading fighter...</p>;

  return (
    <div style={{ padding: "40px" }}>

      <h1>{fighter.full_name}</h1>

      <p><b>Nickname:</b> {fighter.nickname}</p>

      <p><b>Nationality:</b> {fighter.nationality}</p>

      <p><b>Weight Class:</b> {fighter.weight_class}</p>

      <p>
        <b>Record:</b> {fighter.wins}-{fighter.losses}-{fighter.draws}
      </p>

    </div>
  );
}
