import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "../../lib/supabaseClient";

export default function FighterProfile() {

  const router = useRouter();
  const { id } = router.query;

  const [fighter, setFighter] = useState(null);

  useEffect(() => {

    if (!id) return;

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

    fetchFighter();

  }, [id]);

  if (!fighter) {
    return <p>Loading...</p>;
  }

  return (

    <div style={{ padding: "40px", fontFamily: "Arial" }}>

      {fighter.photo_url && (
        <img
          src={fighter.photo_url}
          style={{
            width: "200px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}
        />
      )}

      <h1>{fighter.full_name}</h1>

      <p>
        <b>Nickname:</b> {fighter.nickname}
      </p>

      <p>
        <b>Nationality:</b> {fighter.nationality}
      </p>

      <p>
        <b>Weight Class:</b> {fighter.weight_class}
      </p>

      <p>
        <b>Record:</b> {fighter.wins}-{fighter.losses}-{fighter.draws}
      </p>

    </div>

  );

}
