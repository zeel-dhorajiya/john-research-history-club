"use client";

import Link from "next/link";
import Image from "next/image";
import { SanityArticle } from "@/lib/types";
import { urlFor } from "@/lib/sanity.image";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";

interface ArticleCardProps {
    article: SanityArticle;
    featured?: boolean;
    overlay?: boolean;
}

export default function ArticleCard({
    article,
    featured = false,
    overlay = false,
}: ArticleCardProps) {
    const imageUrl = (article.heroImage && typeof article.heroImage === 'object')
        ? urlFor(article.heroImage).url()
        : (article.image || article.heroImage || null);

    // Overlay mode (as seen in the mockup's featured section)
    if (overlay) {
        return (
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ height: "100%" }}
            >
                <Link
                    href={`/article/${article.slug}`}
                    style={{
                        display: "block",
                        position: "relative",
                        borderRadius: "32px",
                        overflow: "hidden",
                        textDecoration: "none",
                        height: "100%",
                        aspectRatio: "3/4",
                        boxShadow: "var(--shadow-lg)",
                        background: "#000",
                    }}
                    className="group"
                >
                    <motion.div
                        style={{ position: "absolute", inset: 0 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.8 }}
                    >
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={article.title}
                                fill
                                style={{ objectFit: "cover", opacity: 0.9 }}
                                sizes="(max-width: 768px) 100vw, 25vw"
                            />
                        )}
                    </motion.div>

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
                            zIndex: 2,
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: "32px",
                            left: "24px",
                            right: "24px",
                            zIndex: 3,
                        }}
                    >
                        <h3
                            style={{
                                color: "white",
                                fontWeight: 800,
                                fontSize: "1.25rem",
                                lineHeight: 1.2,
                                letterSpacing: "-0.02em",
                            }}
                        >
                            {article.title}
                        </h3>
                    </div>
                </Link>
            </motion.div>
        );
    }

    // Large Featured mode (Original first featured)
    if (featured) {
        return (
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ height: "100%" }}
            >
                <Link
                    href={`/article/${article.slug}`}
                    style={{
                        display: "block",
                        position: "relative",
                        borderRadius: "32px",
                        overflow: "hidden",
                        textDecoration: "none",
                        height: "100%",
                        minHeight: "420px",
                        boxShadow: "var(--shadow-lg)",
                        background: "#000",
                    }}
                    className="group"
                >
                    <motion.div
                        style={{ position: "absolute", inset: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                    >
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={article.title}
                                fill
                                style={{ objectFit: "cover", opacity: 0.8 }}
                                sizes="(max-width: 1200px) 100vw, 50vw"
                            />
                        )}
                    </motion.div>

                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                            zIndex: 1,
                        }}
                    />

                    <div
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: "40px",
                            zIndex: 2,
                        }}
                    >
                        <motion.span
                            style={{
                                display: "inline-block",
                                padding: "6px 14px",
                                borderRadius: "var(--radius-full)",
                                background: "var(--accent)",
                                color: "white",
                                fontSize: "0.72rem",
                                fontWeight: 800,
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}
                        >
                            {article.category}
                        </motion.span>

                        <h3
                            style={{
                                color: "white",
                                fontWeight: 800,
                                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                                lineHeight: 1.1,
                                letterSpacing: "-0.03em",
                                marginBottom: "16px",
                                maxWidth: "600px",
                            }}
                        >
                            {article.title}
                        </h3>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                color: "rgba(255,255,255,0.7)",
                                fontSize: "0.85rem",
                                fontWeight: 500,
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <Clock size={16} color="var(--accent)" />
                                {article.readingTime} min read
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px",
                                    color: "white",
                                    fontWeight: 700,
                                }}
                                className="group-hover:translate-x-1 transition-transform"
                            >
                                Read Article <ChevronRight size={16} color="var(--accent)" />
                            </div>
                        </div>
                    </div>
                </Link>
            </motion.div>
        );
    }

    // Standard List mode
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            style={{ height: "100%" }}
        >
            <Link
                href={`/article/${article.slug}`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "24px",
                    overflow: "hidden",
                    textDecoration: "none",
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-md)",
                    height: "100%",
                    transition: "all 0.3s ease",
                }}
                className="hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)] group"
            >
                <div
                    style={{
                        position: "relative",
                        height: "220px",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        style={{ width: "100%", height: "100%" }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                    >
                        {imageUrl && (
                            <Image
                                src={imageUrl}
                                alt={article.title}
                                fill
                                style={{ objectFit: "cover" }}
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        )}
                    </motion.div>
                </div>

                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3
                        style={{
                            fontSize: "1.15rem",
                            fontWeight: 800,
                            lineHeight: 1.25,
                            color: "var(--foreground)",
                            letterSpacing: "-0.02em",
                            marginBottom: "12px",
                        }}
                    >
                        {article.title}
                    </h3>
                    <p
                        style={{
                            fontSize: "0.9rem",
                            color: "var(--muted)",
                            lineHeight: 1.6,
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            marginBottom: "20px",
                            flex: 1,
                        }}
                    >
                        {article.excerpt}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingTop: "16px",
                            borderTop: "1px solid var(--border-color)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "6px",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "var(--muted)",
                            }}
                        >
                            <Clock size={14} /> {article.readingTime} min read
                        </div>
                        <div
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                gap: "2px",
                            }}
                        >
                            Explore <ChevronRight size={14} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
