import { notFound } from "next/navigation";
import { getArticleBySlug, articles } from "@/lib/data";
import { ContentBlock } from "@/lib/data";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Calendar, ArrowLeft, Bookmark } from "lucide-react";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) return { title: "Not Found – JHRC" };
    return {
        title: `${article.title} – JHRC`,
        description: article.excerpt,
    };
}

export function generateStaticParams() {
    return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: Params) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);
    if (!article) notFound();

    // Extract headings for Table of Contents
    const headings = article.content
        .filter((block) => block.type === "heading" && block.level === 2)
        .map((block) => block.text);

    return (
        <>
            <ReadingProgressBar />

            {/* Hero Header */}
            <header
                style={{
                    position: "relative",
                    width: "100%",
                    height: "70vh",
                    minHeight: "500px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    background: "#000",
                }}
            >
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    priority
                    style={{ objectFit: "cover", opacity: 0.7 }}
                    sizes="100vw"
                />
                <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 1 }} />
                <div className="hero-gradient-fade" style={{ position: "absolute", inset: 0, zIndex: 2 }} />

                <div
                    style={{
                        position: "relative",
                        zIndex: 3,
                        maxWidth: "1000px",
                        padding: "0 24px",
                        textAlign: "center",
                    }}
                >
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "6px 16px",
                            borderRadius: "var(--radius-full)",
                            background: "rgba(200, 169, 106, 0.2)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(200, 169, 106, 0.3)",
                            color: "var(--accent)",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            marginBottom: "32px",
                        }}
                    >
                        {article.category}
                    </div>

                    <h1
                        style={{
                            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                            fontWeight: 800,
                            color: "white",
                            letterSpacing: "-0.04em",
                            lineHeight: 1.05,
                            marginBottom: "32px",
                        }}
                    >
                        {article.title}
                    </h1>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "32px",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.9rem",
                            fontWeight: 600,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Clock size={16} color="var(--accent)" />
                            {article.readingTime} Min Read
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <Calendar size={16} color="var(--accent)" />
                            {new Date(article.publishedAt).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric"
                            })}
                        </div>
                    </div>
                </div>
            </header>

            <main
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "80px 24px",
                    display: "grid",
                    gridTemplateColumns: "1fr 280px",
                    gap: "80px",
                    alignItems: "flex-start",
                }}
                className="article-container"
            >
                {/* Main Content Column */}
                <article>
                    <div
                        className="article-prose"
                        style={{ position: "relative" }}
                    >
                        <p
                            style={{
                                fontSize: "1.4rem",
                                lineHeight: 1.6,
                                color: "var(--muted)",
                                fontStyle: "italic",
                                borderLeft: "4px solid var(--accent)",
                                paddingLeft: "32px",
                                margin: "0 0 4rem -36px",
                            }}
                        >
                            {article.excerpt}
                        </p>

                        {article.content.map((block, i) => (
                            <ContentBlockRenderer key={i} block={block} />
                        ))}
                    </div>

                    {/* Bottom Nav */}
                    <footer
                        style={{
                            marginTop: "80px",
                            paddingTop: "60px",
                            borderTop: "1px solid var(--border-color)",
                            textAlign: "center"
                        }}
                    >
                        <Link
                            href="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "16px 32px",
                                borderRadius: "var(--radius-full)",
                                background: "var(--primary)",
                                color: "white",
                                textDecoration: "none",
                                fontWeight: 800,
                                fontSize: "0.95rem",
                                transition: "all 0.3s ease",
                            }}
                            className="hover:scale-105"
                        >
                            <ArrowLeft size={20} /> Back to Library
                        </Link>
                    </footer>
                </article>

                {/* Sidebar Space */}
                <aside
                    style={{
                        position: "sticky",
                        top: "120px",
                    }}
                    className="hidden lg:block"
                >
                    <div
                        style={{
                            padding: "32px",
                            borderRadius: "var(--radius-lg)",
                            background: "var(--surface)",
                            border: "1px solid var(--border-color)",
                            boxShadow: "var(--shadow-md)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                color: "var(--accent)",
                                textTransform: "uppercase",
                                letterSpacing: "0.15em",
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                marginBottom: "24px",
                            }}
                        >
                            <Bookmark size={16} /> Contents
                        </div>

                        <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {headings.map((heading, i) => (
                                <div
                                    key={i}
                                    style={{
                                        fontSize: "0.9rem",
                                        fontWeight: 600,
                                        color: "var(--muted)",
                                        lineHeight: 1.4,
                                        cursor: "pointer",
                                        transition: "color 0.2s ease",
                                    }}
                                    className="hover:text-[var(--accent)]"
                                >
                                    {heading}
                                </div>
                            ))}
                        </nav>

                        <div
                            style={{
                                marginTop: "40px",
                                paddingTop: "32px",
                                borderTop: "1px solid var(--border-color)",
                            }}
                        >
                            <div style={{ fontSize: "0.8rem", color: "var(--muted)", marginBottom: "16px" }}>
                                Written by
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                                <div
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "50%",
                                        background: "var(--accent)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: "white",
                                        fontWeight: 800,
                                    }}
                                >
                                    J
                                </div>
                                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                                    JHRC Editorial Team
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>

            <style>{`
        @media (max-width: 1024px) {
          .article-container {
            grid-template-columns: 1fr !important;
          }
          .hidden { display: none !important; }
        }
      `}</style>
        </>
    );
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
    switch (block.type) {
        case "heading":
            if (block.level === 2) {
                return <h2 id={block.text.toLowerCase().replace(/\\s+/g, "-")}>{block.text}</h2>;
            }
            return <h3>{block.text}</h3>;

        case "paragraph":
            return <p>{block.text}</p>;

        case "image":
            return (
                <figure>
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            paddingBottom: "56.25%",
                            borderRadius: "var(--radius-lg)",
                            overflow: "hidden",
                            boxShadow: "var(--shadow-md)",
                        }}
                    >
                        <Image
                            src={block.src}
                            alt={block.alt}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 1200px) 100vw, 800px"
                        />
                    </div>
                    {block.caption && (
                        <figcaption
                            style={{
                                textAlign: "center",
                                fontSize: "0.85rem",
                                color: "var(--muted)",
                                marginTop: "16px",
                                fontStyle: "italic",
                            }}
                        >
                            {block.caption}
                        </figcaption>
                    )}
                </figure>
            );

        case "quote":
            return (
                <blockquote className="animate-soft-reveal">
                    &ldquo;{block.text}&rdquo;
                    {block.author && (
                        <footer
                            style={{
                                fontSize: "0.85rem",
                                fontStyle: "normal",
                                fontWeight: 800,
                                color: "var(--accent)",
                                marginTop: "16px",
                                display: "block",
                                textTransform: "uppercase",
                                letterSpacing: "0.1em"
                            }}
                        >
                            — {block.author}
                        </footer>
                    )}
                </blockquote>
            );

        case "divider":
            return <hr style={{ border: "none", borderTop: "1px solid var(--border-color)", margin: "4rem auto", width: "100px" }} />;

        default:
            return null;
    }
}
