import { getAllBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Archival Library | John Research History Club",
  description: "Browse historical books, maps, and research documents in our digital library.",
};

export default function LibraryPage() {
  const books = getAllBooks();

  return (
    <div
      style={{
        maxWidth: "1250px",
        margin: "0 auto",
        padding: "40px 24px 120px",
      }}
    >
      <Breadcrumbs items={[{ label: "Library", href: "/library" }]} />

      <div
        style={{
          margin: "40px 0 60px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 18px",
            borderRadius: "var(--radius-full, 9999px)",
            background: "rgba(200, 169, 106, 0.1)",
            border: "1px solid rgba(200, 169, 106, 0.3)",
            color: "var(--accent, #c8a96a)",
            fontSize: "0.8rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "16px",
          }}
        >
          <BookOpen size={16} /> Historical Collection
        </div>

        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "var(--foreground, #ffffff)",
            letterSpacing: "-0.03em",
            marginBottom: "16px",
          }}
        >
          History Books & Maps
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "var(--muted, rgba(255,255,255,0.6))",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Read historical research works directly on screen with our protected online viewer.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 340px))",
          gap: "32px",
        }}
      >
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
