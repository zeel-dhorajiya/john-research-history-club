import HeroVideo from "@/components/HeroVideo";
import ArticleCard from "@/components/ArticleCard";
import CategoryCard from "@/components/CategoryCard";
import NewsletterForm from "@/components/NewsletterForm";
import { client } from "@/lib/sanity.client";
import { allArticlesQuery, allCategoriesQuery } from "@/lib/sanity.queries";
import { SanityArticle, SanityCategory } from "@/lib/types";
import { getFeaturedBooks } from "@/lib/books";
import BookCard from "@/components/BookCard";

import Link from "next/link";
import { ArrowRight, History, BookOpen } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  let articles: SanityArticle[] = [];
  let categories: SanityCategory[] = [];

  try {
    articles = await client.fetch(allArticlesQuery);
    categories = await client.fetch(allCategoriesQuery);
  } catch (error) {
    console.error("Failed to fetch data from Sanity CMS:", error);
  }

  // If no data available, render a premium empty placeholder page
  if (articles.length === 0 && categories.length === 0) {
    return (
      <div
        style={{
          minHeight: "75vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
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
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          The Archives are Silent
        </h1>
        <p
          style={{
            fontSize: "1.05rem",
            color: "var(--muted)",
            maxWidth: "460px",
            lineHeight: 1.7,
            marginBottom: "32px",
          }}
        >
          We are currently unable to retrieve the historical archives. The library databases might be down or undergoing restoration.
        </p>
        <Link
          href="/"
          prefetch={false}
          style={{
            display: "inline-block",
            padding: "12px 28px",
            borderRadius: "var(--radius-full)",
            background: "var(--accent)",
            color: "white",
            textDecoration: "none",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          Reconnect
        </Link>
      </div>
    );
  }

  let featured = articles.filter((a) => (a as any).featured).slice(0, 4);
  
  // If no articles are explicitly marked as featured, just show the latest 4
  if (featured.length === 0) {
    featured = articles.slice(0, 4);
  }

  const latest = articles.slice(0, 6);

  return (
    <>
      <HeroVideo />

      {/* Featured Articles Section */}
      <section
        id="featured"
        style={{
          maxWidth: "1250px",
          margin: "80px auto 0",
          padding: "0 24px",
        }}
      >
        <SectionHeader title="Featured Articles" href="/category/ancient-civilizations" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="featured-grid"
        >
          {featured.map((article: any, i: number) => (
            <ArticleCard key={article.slug || `featured-${i}`} article={article} overlay />
          ))}
        </div>
      </section>

      <section
        id="books-library"
        style={{
          maxWidth: "1250px",
          margin: "120px auto 0",
          padding: "0 24px",
        }}
      >
        <SectionHeader title="Historical Books & Maps" href="/library" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 340px))",
            gap: "32px",
            marginBottom: "40px",
          }}
        >
          {getFeaturedBooks().map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link
            href="/library"
            prefetch={false}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 32px",
              borderRadius: "var(--radius-full, 9999px)",
              background: "rgba(200, 169, 106, 0.12)",
              border: "1px solid rgba(200, 169, 106, 0.3)",
              color: "var(--accent, #c8a96a)",
              fontWeight: 800,
              fontSize: "0.95rem",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
          >
            Explore More Books <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section
        style={{
          maxWidth: "1250px",
          margin: "120px auto 0",
          padding: "0 24px",
        }}
      >
        <SectionHeader title="Latest Discoveries" href="/category/empires" />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "32px",
          }}
        >
          {latest.map((article: any, i: number) => (
            <ArticleCard key={article.slug || `latest-${i}`} article={article} />
          ))}
        </div>
      </section>

      {/* Categories Explorer */}
      <section
        id="categories"
        style={{
          maxWidth: "1250px",
          margin: "120px auto 120px",
          padding: "0 24px",
        }}
      >
        <SectionHeader title="Explore the Eras" center />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
          className="categories-grid"
        >
          {categories.slice(0, 4).map((cat: any, index: number) => (
            <CategoryCard key={cat.slug || `cat-${index}`} category={cat} index={index} />
          ))}
        </div>
      </section>

      {/* Newsletter Experience */}
      <section
        style={{
          background: "var(--primary)",
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            opacity: 0.1,
            pointerEvents: "none"
          }}
        />

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <span
            style={{
              display: "inline-block",
              padding: "6px 20px",
              borderRadius: "var(--radius-full)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "0.75rem",
              fontWeight: 800,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "32px",
            }}
          >
            The Newsletter
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.03em",
              marginBottom: "24px",
              lineHeight: 1.1,
            }}
          >
            Chronicles of the Past <br /> in Your Inbox.
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "48px",
              maxWidth: "560px",
              margin: "0 auto 48px",
            }}
          >
            Join 15,000+ history enthusiasts. Curated insights, archival discoveries, and deep dives into the human story.
          </p>
          <div style={{ maxWidth: "500px", margin: "0 auto" }}>
            <NewsletterForm />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .featured-grid, .categories-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .featured-grid, .categories-grid {
            grid-template-columns: 1fr !important;
          }
          .section-title {
            font-size: 1.5rem !important;
          }
          section {
            margin-top: 60px !important;
            padding: 0 16px !important;
          }
        }
      `}</style>
    </>
  );
}

function SectionHeader({
  title,
  href,
  center = false,
}: {
  title: string;
  href?: string;
  center?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "space-between",
        marginBottom: "32px",
      }}
    >
      <h2
        className="section-title"
        style={{
          fontSize: "2rem",
          fontWeight: 800,
          color: "var(--foreground)",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h2>

      {!center && href && (
        <Link
          href={href}
          prefetch={false}
          style={{
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "var(--muted)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          View All <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
