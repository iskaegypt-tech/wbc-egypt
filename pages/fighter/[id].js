import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function FighterProfile(){

const router = useRouter()
const { id } = router.query

const [fighter,setFighter] = useState(null)

useEffect(()=>{
if(id){
loadFighter()
}
},[id])

async function loadFighter(){

const { data, error } = await supabase
.from("fighters")
.select("*")
.eq("id",id)
.single()

if(!error){
setFighter(data)
}

}

if(!fighter){
return <div style={{padding:"40px"}}>Loading...</div>
}

return(

<div style={{padding:"40px"}}>

<h1>{fighter.full_name}</h1>

<p><b>Nickname:</b> {fighter.nickname}</p>

<p><b>Nationality:</b> {fighter.nationality}</p>

<p><b>Weight Class:</b> {fighter.weight_class}</p>

<p><b>Gym:</b> {fighter.gym_name}</p>

<h2>Record</h2>

<p>
{fighter.pro_wins} -
{fighter.pro_losses} -
{fighter.pro_draws}
( {fighter.pro_kos} KO )
</p>

<h2>Details</h2>

<p><b>Height:</b> {fighter.height_cm} cm</p>

<p><b>Stance:</b> {fighter.stance}</p>

</div>

)

}
