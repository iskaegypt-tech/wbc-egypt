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
gap:"20px",
marginTop:"40px"
}}>

<img
src="/belt.png"
width="120"
/>

<div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"20px"}}>

<img
src="PUT_IMAGE_URL_HERE"
style={{width:"160px"}}
/>

<h1 style={{margin:0}}>WBC Muay Thai Egypt</h1>

</div>
  https://vnagfyicoofgqwktrsvu.supabase.co/storage/v1/object/public/Public/WBC%20Muay%20Thai%20Egypt.jpg

<p>Official Fighters & Events Management Platform</p>        <p style={{marginTop:"10px"}}>
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
          marginTop:"40px",
          flexWrap:"wrap"
        }}>

          <Link href="/fighters">
            <div style={card}>
              🥊
              <h3>Fighters</h3>
              <p>View registered fighters</p>
            </div>
          </Link>

          <Link href="/events">
            <div style={card}>
              📅
              <h3>Events</h3>
              <p>Upcoming fight events</p>
            </div>
          </Link>

          <Link href="/titles">
            <div style={card}>
              🏆
              <h3>Titles</h3>
              <p>Champion belts</p>
            </div>
          </Link>

          <Link href="/rankings">
            <div style={card}>
              📊
              <h3>Rankings</h3>
              <p>Official rankings</p>
            </div>
          </Link>

        </div>
      </div>

      {/* Footer */}
      <div style={{
        marginTop:"80px",
        padding:"20px",
        background:"#f2f2f2"
      }}>
        <p>© 2026 WBC Muay Thai Egypt</p>
      </div>

    </div>
  );
}

const card = {
  width:"200px",
  padding:"25px",
  border:"1px solid #ddd",
  borderRadius:"10px",
  cursor:"pointer",
  background:"#fff",
  transition:"0.2s"
};
