import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FighterRegister() {

  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [nationality, setNationality] = useState("");
  const [weightClass, setWeightClass] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("fighters")
      .insert([
        {
          full_name: fullName,
          nickname: nickname,
          nationality: nationality,
          weight_class: weightClass,
          wins: 0,
          losses: 0,
          draws: 0,
          ko_wins: 0
        }
      ]);

    if (error) {
      alert("Error saving fighter");
      console.error(error);
    } else {
      alert("Fighter registered successfully");
      setFullName("");
      setNickname("");
      setNationality("");
      setWeightClass("");
    }
  };

  return (
    <div style={{padding:"40px", fontFamily:"Arial"}}>
      <h1>Fighter Registration</h1>

      <form onSubmit={handleSubmit}>

        <div style={{marginBottom:"10px"}}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div style={{marginBottom:"10px"}}>
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>

        <div style={{marginBottom:"10px"}}>
          <input
            type="text"
            placeholder="Nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          />
        </div>

        <div style={{marginBottom:"10px"}}>
          <input
            type="text"
            placeholder="Weight Class"
            value={weightClass}
            onChange={(e) => setWeightClass(e.target.value)}
          />
        </div>

        <button type="submit">
          Register Fighter
        </button>

      </form>
    </div>
  );
}
