import Link from "next/link";

export default function Home() {
  return (
    <div style={{fontFamily:"Arial",background:"#ADD8E6",minHeight:"100vh"}}>

      {/* HEADER */}
      <div style={{textAlign:"center",padding:"60px 20px"}}>

        <img
        src="https://vnaqfyicoofgqwktsrvu.supabase.co/storage/v1/object/public/Public/WBC%20Muay%20Thai%20Egypt.jpg"
        style={{width:"300px"}}
        />

        <h1 style={{fontSize:"48px",marginTop:"20px"}}>
        WBC Muay Thai Egypt
        </h1>

        <p style={{fontSize:"20px"}}>
        Official Fighters & Events Management Platform
        </p>

      </div>


      {/* NAVIGATION */}
      <div style={{
        display:"flex",
        justifyContent:"center",
        gap:"30px",
        flexWrap:"wrap",
        marginBottom:"50px"
      }}>

        <Link href="/fighters"><div style={card}>🥊 Fighters</div></Link>
        <Link href="/events"><div style={card}>📅 Events</div></Link>
        <Link href="/titles"><div style={card}>🏆 Titles</div></Link>
        <Link href="/rankings"><div style={card}>📊 Rankings</div></Link>

      </div>


      {/* CHAMPIONS */}
      <div style={{textAlign:"center",marginBottom:"60px"}}>
        <h2>Champions</h2>

        <div style={row}>

          <div style={champCard}>
            <h3>Super Lightweight</h3>
            <p>Champion Name</p>
          </div>

          <div style={champCard}>
            <h3>Middleweight</h3>
            <p>Champion Name</p>
          </div>

          <div style={champCard}>
            <h3>Heavyweight</h3>
            <p>Champion Name</p>
          </div>

        </div>

      </div>


      {/* TOP FIGHTERS */}
      <div style={{textAlign:"center",marginBottom:"60px"}}>
        <h2>Top Fighters</h2>

        <div style={row}>

          <div style={fighterCard}>
            <p>Fighter Name</p>
            <p>Record: 10-2-1</p>
          </div>

          <div style={fighterCard}>
            <p>Fighter Name</p>
            <p>Record: 8-1-0</p>
          </div>

          <div style={fighterCard}>
            <p>Fighter Name</p>
            <p>Record: 12-3-2</p>
          </div>

        </div>

      </div>


      {/* EVENTS */}
      <div style={{textAlign:"center",marginBottom:"80px"}}>
        <h2>Upcoming Events</h2>

        <div style={row}>

          <div style={eventCard}>
            <p>WBC Muay Thai Egypt Championship</p>
            <p>Cairo</p>
            <p>2026</p>
          </div>

          <div style={eventCard}>
            <p>National Muay Thai Event</p>
            <p>Alexandria</p>
            <p>2026</p>
          </div>

        </div>

      </div>


      {/* FOOTER */}
      <div style={{
        textAlign:"center",
        padding:"20px",
        background:"#ffffff"
      }}>
        <p>© 2026 WBC Muay Thai Egypt</p>
      </div>

    </div>
  );
}



const card={
  background:"#ffffff",
  padding:"20px 40px",
  borderRadius:"10px",
  cursor:"pointer",
  fontSize:"20px",
  boxShadow:"0px 4px 10px rgba(0,0,0,0.2)"
}

const row={
  display:"flex",
  justifyContent:"center",
  gap:"20px",
  flexWrap:"wrap",
  marginTop:"20px"
}

const champCard={
  background:"#fff",
  padding:"20px",
  borderRadius:"10px",
  width:"200px",
  boxShadow:"0px 4px 10px rgba(0,0,0,0.2)"
}

const fighterCard={
  background:"#fff",
  padding:"20px",
  borderRadius:"10px",
  width:"200px",
  boxShadow:"0px 4px 10px rgba(0,0,0,0.2)"
}

const eventCard={
  background:"#fff",
  padding:"20px",
  borderRadius:"10px",
  width:"250px",
  boxShadow:"0px 4px 10px rgba(0,0,0,0.2)"
}
<Link href="/champions">
  <div style={card}>🥇 Champions</div>
</Link>
