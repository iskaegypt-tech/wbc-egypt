import Link from "next/link";

export default function Home() {
  return (
    <div style={{fontFamily:"Arial",background:"#ADD8E6",minHeight:"100vh"}}>

      {/* HEADER */}
      <div style={{
        textAlign:"center",
        padding:"60px 20px"
      }}>

        <img
          src="https://vnaqfyicoofgqwktsrvu.supabase.co/storage/v1/object/public/Public/WBC%20Muay%20Thai%20Egypt.jpg"
          style={{width:"300px"}}
        />

        <h1 style={{
          fontSize:"46px",
          marginTop:"20px"
        }}>
          WBC Muay Thai Egypt
        </h1>

        <p style={{
          fontSize:"20px",
          color:"#333"
        }}>
          Official Fighters & Events Management Platform
        </p>

      </div>


      {/* NAVIGATION CARDS */}
      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"30px",
        flexWrap:"wrap",
        padding:"40px"
      }}>

        <Link href="/fighters">
          <div style={card}>
            <h2>🥊 Fighters</h2>
            <p>View registered fighters</p>
          </div>
        </Link>

        <Link href="/events">
          <div style={card}>
            <h2>📅 Events</h2>
            <p>Upcoming fight events</p>
          </div>
        </Link>

        <Link href="/titles">
          <div style={card}>
            <h2>🏆 Titles</h2>
            <p>Championship belts</p>
          </div>
        </Link>

        <Link href="/rankings">
          <div style={card}>
            <h2>📊 Rankings</h2>
            <p>Official rankings</p>
          </div>
        </Link>

      </div>


      {/* FOOTER */}
      <div style={{
        textAlign:"center",
        padding:"20px",
        marginTop:"40px",
        background:"#ffffff"
      }}>
        <p>© 2026 WBC Muay Thai Egypt</p>
      </div>

    </div>
  );
}


const card = {
  width:"220px",
  background:"#ffffff",
  padding:"25px",
  borderRadius:"12px",
  textAlign:"center",
  cursor:"pointer",
  boxShadow:"0px 5px 15px rgba(0,0,0,0.2)"
};
