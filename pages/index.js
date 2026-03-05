import Link from "next/link";

export default function Home() {
  return (
    <div style={{fontFamily:"Arial", textAlign:"center"}}>

      {/* Header */}
      <div style={{
        background:"#000",
        color:"#fff",
        padding:"40px"
      }}>

        <div style={{
          display:"flex",
          alignItems:"center",
          justifyContent:"center",
          gap:"20px"
        }}>

          <img
            src="https://vnaqfyicoofgqwktsrvu.supabase.co/storage/v1/object/public/Public/WBC%20Muay%20Thai%20Egypt.jpg"
            style={{width:"160px"}}
          />

          <h1 style={{margin:0}}>WBC Muay Thai Egypt</h1>

        </div>

        <p style={{marginTop:"10px"}}>
          Official Fighters & Events Management Platform
        </p>

      </div>

      {/* Navigation */}
      <div style={{marginTop:"60px"}}>

        <h2>Explore the Platform</h2>

        <div style={{
          display:"flex",
          justifyContent:"center",
          gap:"40px",
          marginTop:"30px"
        }}>

          <Link href="/fighters">Fighters</Link>
          <Link href="/events">Events</Link>
          <Link href="/titles">Titles</Link>

        </div>

      </div>

    </div>
  );
}
