import HeroVideo from "@/components/HeroVideo";
import ArticleCard from "@/components/ArticleCard";
import CategoryCard from "@/components/CategoryCard";
import NewsletterForm from "@/components/NewsletterForm";
import { client } from "@/lib/sanity.client";
import { allArticlesQuery, allCategoriesQuery } from "@/lib/sanity.queries";
import { SanityArticle, SanityCategory } from "@/lib/types";
import { getFallbackArticles, getFallbackCategories } from "@/lib/sanity.fallback";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 60; // Revalidate every minute

export default async function HomePage() {
  let articles: SanityArticle[] = await client.fetch(allArticlesQuery);
  let categories: SanityCategory[] = await client.fetch(allCategoriesQuery);

  // Fallback to dummy data if Sanity is empty
  if (articles.length === 0) {
    articles = getFallbackArticles();
  }
  if (categories.length === 0) {
    categories = getFallbackCategories();
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
          {featured.map((article: any) => (
            <ArticleCard key={article.slug} article={article} overlay />
          ))}
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
          {latest.map((article: any) => (
            <ArticleCard key={article.slug} article={article} />
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
            <CategoryCard key={cat.slug} category={cat} index={index} />
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
