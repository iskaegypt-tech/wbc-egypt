import Link from "next/link";

export default function Home() {
  return (
    <div style={{fontFamily:"Arial",textAlign:"center",background:"#111",color:"#fff",minHeight:"100vh"}}>

      <div style={{padding:"60px"}}>

        <img
        src="https://vnaqfyicoofgqwktsrvu.supabase.co/storage/v1/object/public/Public/WBC%20Muay%20Thai%20Egypt.jpg"
        style={{width:"260px"}}
        />

        <h1 style={{fontSize:"40px",marginTop:"20px"}}>
        WBC Muay Thai Egypt
        </h1>

        <p style={{color:"#ccc"}}>
        Official Fighters & Events Management Platform
        </p>

      </div>

      <div style={{display:"flex",justifyContent:"center",gap:"40px"}}>

        <Link href="/fighters">Fighters</Link>

        <Link href="/events">Events</Link>

        <Link href="/titles">Titles</Link>

      </div>

    </div>
  );
}
