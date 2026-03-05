import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function FighterRegister() {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [gym, setGym] = useState("");

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const handleSubmit = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase
    .from("fighters")
    .insert([
      {
        full_name: name,
        nickname: name,
        nationality: "Egypt"
      }
    ]);

  if (error) {
    alert("Error saving fighter");
  } else {
    alert("Fighter registered successfully");
  }
};e.preventDefault()

const { data, error } = await supabase
.from("fighters")
.insert([
{
name: name,
weight_class: weight,
gym: gym
}
])

if(error){
alert("Error saving fighter")
}else{
alert("Fighter registered successfully")
}
}    e.preventDefault();
    alert("Fighter submitted (database connection will be next step)");
  };

  return (
    <div style={{textAlign:"center",marginTop:"50px"}}>
      <h1>Fighter Registration</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Fighter Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <br/><br/>

        <input
          placeholder="Weight Class"
          value={weight}
          onChange={(e)=>setWeight(e.target.value)}
        />
        <br/><br/>

        <input
          placeholder="Gym Name"
          value={gym}
          onChange={(e)=>setGym(e.target.value)}
        />
        <br/><br/>

        <button type="submit">Register Fighter</button>
      </form>
    </div>
  );
}
