import Link from "next/link";

export default function Home() {
  return (
    <div style={{textAlign:"center", marginTop:"80px"}}>

      <h1>WBC Muay Thai Egypt</h1>
      <p>Official Fighters & Events Management Platform</p>

      <div style={{marginTop:"40px", fontSize:"20px"}}>

        <p>
          <Link href="/fighters">Fighters</Link>
        </p>

        <p>
          <Link href="/events">Events</Link>
        </p>

        <p>
          <Link href="/titles">Titles</Link>
        </p>

        <p>
          <Link href="/rankings">Rankings</Link>
        </p>

      </div>

    </div>
  );
}
