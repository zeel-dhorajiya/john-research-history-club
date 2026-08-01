import Link from "next/link";
import { History, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "0 24px",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "16px",
          background: "rgba(200, 169, 106, 0.1)",
          border: "1px solid rgba(200, 169, 106, 0.2)",
          color: "var(--accent)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        <History size={32} />
      </div>

      <h1
        style={{
          fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: "16px",
        }}
      >
        Lost in Time
      </h1>
      
      <p
        style={{
          fontSize: "1.1rem",
          color: "var(--muted)",
          maxWidth: "480px",
          lineHeight: 1.7,
          marginBottom: "40px",
        }}
      >
        The historical records you are looking for do not exist or have been lost to the ages.
      </p>

      <Link
        href="/"
        prefetch={false}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 28px",
          borderRadius: "var(--radius-full)",
          background: "var(--accent)",
          color: "white",
          textDecoration: "none",
          fontWeight: 700,
          fontSize: "0.9rem",
          transition: "transform 0.2s ease",
        }}
        className="hover:scale-105"
      >
        <ArrowLeft size={18} /> Return to Library
      </Link>
    </div>
  );
}
