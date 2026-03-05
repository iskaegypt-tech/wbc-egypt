import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Fighters() {

  const [fighters,setFighters] = useState([])

  useEffect(()=>{
    loadFighters()
  },[])

  async function loadFighters(){

    const { data, error } = await supabase
      .from("fighters")
      .select("*")

    if(error){
      console.log(error)
      return
    }

    setFighters(data)
  }

  return(

    <div style={{padding:"40px"}}>

      <h1>Fighters</h1>

      {fighters.map((fighter)=>(
        <div key={fighter.id} style={{marginBottom:"10px"}}>

          <Link href={`/fighter/${fighter.id}`}>
            {fighter.full_name}
          </Link>

        </div>
      ))}

    </div>
  )
}
