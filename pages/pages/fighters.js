import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Fighters(){

const [fighters,setFighters]=useState([])

useEffect(()=>{
loadFighters()
},[])

async function loadFighters(){

const {data} = await supabase
.from("fighters")
.select("*")

setFighters(data)

}

return(

<div style={{padding:"40px"}}>

<h1>Fighters</h1>

<table border="1" cellPadding="10">

<thead>
<tr>
<th>Name</th>
<th>Weight Class</th>
<th>Gym</th>
</tr>
</thead>

<tbody>

{fighters.map(f=>(
<tr key={f.id}>

<td>
<Link href={`/fighter/${f.id}`}>
{f.full_name}
</Link>
</td>

<td>{f.weight_class}</td>
<td>{f.gym_name}</td>

</tr>
))}

</tbody>

</table>

</div>

)

}
