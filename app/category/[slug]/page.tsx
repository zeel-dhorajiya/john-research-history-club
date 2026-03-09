import { notFound } from "next/navigation";
import { client } from "@/lib/sanity.client";
import { articlesByCategoryQuery, allCategoriesQuery } from "@/lib/sanity.queries";
import { getFallbackArticles, getFallbackCategories } from "@/lib/sanity.fallback";
import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { urlFor } from "@/lib/sanity.image";

interface Params {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    const { slug } = await params;
    let categories = await client.fetch(allCategoriesQuery);
    if (categories.length === 0) categories = getFallbackCategories();

    const category = categories.find((c: any) => c.slug === slug);

    if (!category) return { title: "Not Found – JHRC" };
    return {
        title: `${category.title} – JHRC`,
        description: category.description,
    };
}

export async function generateStaticParams() {
    let categories = await client.fetch(allCategoriesQuery);
    if (categories.length === 0) categories = getFallbackCategories();
    return categories.map((c: any) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: Params) {
    const { slug } = await params;
    let categories = await client.fetch(allCategoriesQuery);
    if (categories.length === 0) categories = getFallbackCategories();

    const category = categories.find((c: any) => c.slug === slug);

    if (!category) notFound();

    let categoryArticles = await client.fetch(articlesByCategoryQuery, { categorySlug: slug });
    if (categoryArticles.length === 0) {
        categoryArticles = getFallbackArticles().filter(a => a.categorySlug === slug);
    }

    // Fallback banner logic
    const banner = "/hero_ancient_egypt.png";

    return (
        <>
            <style>{`
        .cat-pill-link {
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-color);
          background: var(--surface);
          color: var(--foreground);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .cat-pill-link:hover {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
      `}</style>

            {/* Hero banner */}
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "45vh",
                    minHeight: "360px",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={banner}
                    alt={category.title}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="100vw"
                />
                <div
                    className="hero-gradient-center"
                    style={{ position: "absolute", inset: 0 }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "0 24px",
                        zIndex: 2,
                    }}
                >
                    <span
                        style={{
                            display: "inline-block",
                            padding: "4px 16px",
                            borderRadius: "var(--radius-full)",
                            background: "rgba(200,169,106,0.25)",
                            border: "1px solid rgba(200,169,106,0.5)",
                            color: "var(--accent)",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            marginBottom: "16px",
                        }}
                    >
                        Category
                    </span>
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 5vw, 3.5rem)",
                            fontWeight: 800,
                            color: "white",
                            letterSpacing: "-0.03em",
                            marginBottom: "14px",
                            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
                        }}
                    >
                        {category.title}
                    </h1>
                    <p
                        style={{
                            fontSize: "1rem",
                            color: "rgba(255,255,255,0.8)",
                            maxWidth: "480px",
                            lineHeight: 1.65,
                        }}
                    >
                        {category.description}
                    </p>
                </div>
            </div>

            {/* Articles grid */}
            <main
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "72px 24px 100px",
                }}
            >
                {/* Breadcrumb */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontSize: "0.8rem",
                        color: "var(--muted)",
                        marginBottom: "40px",
                    }}
                >
                    <Link
                        href="/"
                        style={{ color: "var(--muted)", textDecoration: "none" }}
                    >
                        Home
                    </Link>
                    <span>/</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>
                        {category.title}
                    </span>
                </div>

                {categoryArticles.length === 0 ? (
                    <div
                        style={{
                            textAlign: "center",
                            padding: "80px 24px",
                            color: "var(--muted)",
                        }}
                    >
                        <p style={{ fontSize: "1.1rem" }}>
                            No articles in this category yet. Check back soon!
                        </p>
                        <Link
                            href="/"
                            style={{
                                display: "inline-block",
                                marginTop: "24px",
                                padding: "12px 28px",
                                borderRadius: "var(--radius-full)",
                                background: "var(--accent)",
                                color: "white",
                                textDecoration: "none",
                                fontWeight: 700,
                                fontSize: "0.9rem",
                            }}
                        >
                            Back to Home
                        </Link>
                    </div>
                ) : (
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                            gap: "24px",
                        }}
                    >
                        {categoryArticles.map((article: any) => (
                            <ArticleCard key={article.slug} article={article} />
                        ))}
                    </div>
                )}

                {/* All categories quick nav */}
                <div style={{ marginTop: "80px" }}>
                    <h2
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            color: "var(--foreground)",
                            marginBottom: "20px",
                        }}
                    >
                        Other Categories
                    </h2>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {categories
                            .filter((c: any) => c.slug !== slug)
                            .map((c: any) => (
                                <Link
                                    key={c.slug}
                                    href={`/category/${c.slug}`}
                                    className="cat-pill-link"
                                >
                                    {c.title}
                                </Link>
                            ))}
                    </div>
                </div>
            </main>
        </>
    );
}
