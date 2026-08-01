import { getBookBySlug } from "@/lib/books";
import Breadcrumbs from "@/components/Breadcrumbs";
import ClientPdfReader from "@/components/ClientPdfReader";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const book = getBookBySlug(resolvedParams.slug);

  if (!book) return { title: "Book Not Found" };

  return {
    title: `${book.title} | John Research History Club Library`,
    description: book.description,
  };
}

export default async function BookReaderPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const book = getBookBySlug(resolvedParams.slug);

  if (!book) {
    notFound();
  }

  return (
    <div
      style={{
        maxWidth: "1250px",
        margin: "0 auto",
        padding: "40px 24px 100px",
      }}
    >
      <Breadcrumbs
        items={[
          { label: "Library", href: "/library" },
          { label: book.title, href: `/library/${book.slug}` },
        ]}
      />

      <div style={{ margin: "24px 0 36px" }}>
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--foreground, #ffffff)",
            letterSpacing: "-0.02em",
            marginBottom: "8px",
          }}
        >
          {book.title}
        </h1>
        <p style={{ color: "var(--accent, #c8a96a)", fontWeight: 600 }}>
          By {book.author} ({book.publishedYear}) • {book.category}
        </p>
      </div>

      <ClientPdfReader pdfUrl={book.pdfUrl} title={book.title} />
    </div>
  );
}
