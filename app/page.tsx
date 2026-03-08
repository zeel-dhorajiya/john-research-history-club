"use client";

import HeroVideo from "@/components/HeroVideo";
import ArticleCard from "@/components/ArticleCard";
import CategoryCard from "@/components/CategoryCard";
import NewsletterForm from "@/components/NewsletterForm";
import {
  getFeaturedArticles,
  getLatestArticles,
  categories,
} from "@/lib/data";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  const featured = getFeaturedArticles();
  const latest = getLatestArticles(6);

  return (
    <>
      <HeroVideo />

      {/* Featured Articles Section */}
      <section
        id="featured"
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "100px 24px 0",
        }}
      >
        <SectionHeader title="Editorial Picks" href="/category/ancient-civilizations" />

        <div className="magazine-grid">
          {featured.length > 0 && (
            <div className="magazine-grid-full">
              <ArticleCard article={featured[0]} featured />
            </div>
          )}
          {featured.slice(1, 3).map((article) => (
            <ArticleCard key={article.slug} article={article} featured />
          ))}
        </div>
      </section>

      {/* Latest Articles Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "100px 24px 0",
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
          {latest.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </motion.section>

      {/* Categories Explorer */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        style={{
          maxWidth: "1250px",
          margin: "0 auto",
          padding: "120px 24px 120px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <SectionHeader title="Explore the Eras" center />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "24px",
          }}
        >
          {categories.map((cat, index) => (
            <CategoryCard key={cat.slug} category={cat} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Newsletter Experience */}
      <section
        style={{
          background: "var(--primary)",
          padding: "120px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative element */}
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

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
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
        </motion.div>
      </section>
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
        alignItems: "flex-end",
        justifyContent: center ? "center" : "space-between",
        marginBottom: "48px",
        textAlign: center ? "center" : "left",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: center ? "center" : "flex-start" }}>
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--foreground)",
            lineHeight: 1,
          }}
        >
          {title}
        </h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: 60 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            height: "4px",
            background: "var(--accent)",
            borderRadius: "2px",
            marginTop: "16px",
          }}
        />
      </div>

      {!center && href && (
        <Link
          href={href}
          style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "var(--accent)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 0",
          }}
          className="group"
        >
          View More
          <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
            <ArrowRight size={18} />
          </motion.span>
        </Link>
      )}
    </div>
  );
}
