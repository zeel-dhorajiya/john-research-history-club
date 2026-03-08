"use client";

import Link from "next/link";
import Image from "next/image";
import { Article } from "@/lib/data";
import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";

interface ArticleCardProps {
    article: Article;
    featured?: boolean;
}

export default function ArticleCard({
    article,
    featured = false,
}: ArticleCardProps) {
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
                        borderRadius: "var(--radius-lg)",
                        overflow: "hidden",
                        textDecoration: "none",
                        height: "100%",
                        minHeight: "420px",
                        boxShadow: "var(--shadow-lg)",
                        background: "#000",
                    }}
                    className="group"
                >
                    {/* Background image */}
                    <motion.div
                        style={{ position: "absolute", inset: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            style={{ objectFit: "cover", opacity: 0.8 }}
                            sizes="(max-width: 1200px) 100vw, 50vw"
                        />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
                            zIndex: 1,
                        }}
                    />

                    {/* Content */}
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
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
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
                                boxShadow: "0 4px 12px rgba(200,169,106,0.3)",
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
                    borderRadius: "var(--radius-lg)",
                    overflow: "hidden",
                    textDecoration: "none",
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    boxShadow: "var(--shadow-md)",
                    height: "100%",
                    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                className="hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)] group"
            >
                {/* Image */}
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
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            style={{ objectFit: "cover" }}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </motion.div>

                    <div
                        style={{
                            position: "absolute",
                            top: "16px",
                            left: "16px",
                            zIndex: 2,
                        }}
                    >
                        <span
                            style={{
                                padding: "5px 12px",
                                borderRadius: "var(--radius-full)",
                                background: "rgba(0,0,0,0.6)",
                                backdropFilter: "blur(8px)",
                                color: "var(--accent)",
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                letterSpacing: "0.08em",
                                textTransform: "uppercase",
                                border: "1px solid rgba(200,169,106,0.3)",
                            }}
                        >
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: "24px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3
                        style={{
                            fontSize: "1.15rem",
                            fontWeight: 800,
                            lineHeight: 1.25,
                            color: "var(--foreground)",
                            letterSpacing: "-0.02em",
                            marginBottom: "12px",
                            flex: "none",
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
                            marginTop: "auto",
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
