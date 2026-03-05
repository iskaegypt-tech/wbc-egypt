import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial",
        textAlign: "center",
        background: "#ADD8E6",
        color: "#000",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div style={{ padding: "60px" }}>
        <img
          src="https://vnaqfyicoofgqwktsrvu.supabase.co/storage/v1/object/public/Public/WBC%20Muay%20Thai%20Egypt.jpg"
          style={{ width: "260px", marginBottom: "20px" }}
        />

        <h1 style={{ fontSize: "42px", margin: "10px 0" }}>
          WBC Muay Thai Egypt
        </h1>

        <p style={{ fontSize: "18px" }}>
          Official Fighters & Events Management Platform
        </p>
      </div>

      {/* MENU */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          paddingBottom: "60px",
        }}
      >
        <Link href="/fighters">
          <div style={button}>Fighters</div>
        </Link>

        <Link href="/events">
          <div style={button}>Events</div>
        </Link>

        <Link href="/titles">
          <div style={button}>Titles</div>
        </Link>
      </div>
    </div>
  );
}

const button = {
  background: "#ffffff",
  padding: "20px 40px",
  borderRadius: "8px",
  fontSize: "20px",
  cursor: "pointer",
  border: "1px solid #ccc",
};
