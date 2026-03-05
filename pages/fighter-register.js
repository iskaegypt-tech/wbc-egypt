import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FighterRegister() {

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [gym, setGym] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("fighters")
      .insert([
        {
          full_name: name,
          nickname: name,
          nationality: "Egypt",
          weight_class: weight,
          gym: gym
        }
      ]);

    if (error) {
      alert("Error saving fighter");
      console.log(error);
    } else {
      alert("Fighter registered successfully");
      setName("");
      setWeight("");
      setGym("");
    }
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>Fighter Registration</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            placeholder="Fighter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br/>

        <div>
          <input
            placeholder="Weight Class"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <br/>

        <div>
          <input
            placeholder="Gym Name"
            value={gym}
            onChange={(e) => setGym(e.target.value)}
          />
        </div>

        <br/>

        <button type="submit">
          Register Fighter
        </button>

      </form>
    </div>
  );
}
