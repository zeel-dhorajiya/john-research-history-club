"use client";

import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/books";
import { BookOpen } from "lucide-react";

export default function BookCard({ book }: { book: Book }) {
  return (
    <div
      style={{
        background: "var(--card-bg, rgba(255,255,255,0.03))",
        border: "1px solid var(--border, rgba(255,255,255,0.08))",
        borderRadius: "16px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className="book-card-container"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "260px",
          background: "rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        <Image
          src={book.coverImage}
          alt={book.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            padding: "4px 12px",
            borderRadius: "var(--radius-full, 9999px)",
            background: "rgba(200, 169, 106, 0.2)",
            border: "1px solid rgba(200, 169, 106, 0.4)",
            color: "var(--accent, #c8a96a)",
            fontSize: "0.75rem",
            fontWeight: 700,
          }}
        >
          {book.category}
        </span>
      </div>

      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "var(--foreground, #ffffff)",
            marginBottom: "6px",
            lineHeight: 1.3,
          }}
        >
          {book.title}
        </h3>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--accent, #c8a96a)",
            fontWeight: 600,
            marginBottom: "12px",
          }}
        >
          By {book.author} ({book.publishedYear})
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "var(--muted, rgba(255,255,255,0.6))",
            lineHeight: 1.6,
            marginBottom: "20px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            flex: 1,
          }}
        >
          {book.description}
        </p>

        <Link
          href={`/library/${book.slug}`}
          prefetch={false}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "var(--radius-full, 9999px)",
            background: "var(--accent, #c8a96a)",
            color: "#000000",
            fontWeight: 700,
            fontSize: "0.9rem",
            textDecoration: "none",
            transition: "opacity 0.2s",
          }}
        >
          <BookOpen size={16} /> Read Online
        </Link>
      </div>
    </div>
  );
}
