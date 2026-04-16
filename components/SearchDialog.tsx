"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, History, ArrowRight, Loader2, Clock } from "lucide-react";
import Link from "next/link";
import { client } from "@/lib/sanity.client";
import { searchArticlesQuery } from "@/lib/sanity.queries";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";

interface SearchResult {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    categorySlug: string;
    heroImage: any;
    publishedAt: string;
    readingTime: number;
}

interface SearchDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when dialog is open
    useEffect(() => {
        if (!isOpen) {
            // Restore body — recover the previous scroll position
            const top = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            if (top) window.scrollTo(0, parseInt(top) * -1);
            setQuery("");
            setResults([]);
            return;
        }

        // Freeze the page at its current scroll position
        const scrollY = window.scrollY;
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        // Focus input
        setTimeout(() => inputRef.current?.focus(), 80);

        return () => {
            const top = document.body.style.top;
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.width = "";
            document.body.style.overflow = "";
            if (top) window.scrollTo(0, parseInt(top) * -1);
        };
    }, [isOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    // Debounced search
    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsLoading(true);
            try {
                const data = await client.fetch(searchArticlesQuery, {
                    searchQuery: `${query}*`,
                });
                setResults(data);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setIsLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop — clicking this closes the dialog */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.65)",
                            backdropFilter: "blur(14px)",
                            WebkitBackdropFilter: "blur(14px)",
                            zIndex: 1100,
                            cursor: "default",
                        }}
                    />

                    {/* Dialog panel */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        // Stop clicks inside from bubbling to the backdrop
                        onClick={(e) => e.stopPropagation()}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        style={{
                            position: "fixed",
                            top: "calc(var(--nav-height) + 20px)",
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "calc(100% - 40px)",
                            maxWidth: "800px",
                            maxHeight: "calc(90vh - var(--nav-height) - 20px)",
                            background: "var(--surface)",
                            borderRadius: "var(--radius-xl)",
                            zIndex: 1101,
                            boxShadow: "var(--shadow-xl)",
                            display: "flex",
                            flexDirection: "column",
                            overflow: "hidden",
                            border: "1px solid var(--border-color)",
                        }}
                    >
                        {/* Search Header */}
                        <div
                            style={{
                                padding: "20px 24px",
                                borderBottom: "1px solid var(--border-color)",
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                flexShrink: 0,
                            }}
                        >
                            <Search size={20} style={{ color: "var(--muted)", flexShrink: 0 }} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search the archives of history..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    fontSize: "1.15rem",
                                    fontWeight: 500,
                                    color: "var(--foreground)",
                                    fontFamily: "inherit",
                                }}
                            />
                            <button
                                onClick={onClose}
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: "50%",
                                    background: "var(--surface-hover)",
                                    border: "none",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "var(--muted)",
                                    flexShrink: 0,
                                }}
                            >
                                <X size={16} />
                            </button>
                        </div>

                        {/* Results — this is the ONLY scrollable area */}
                        <div
                            ref={resultsRef}
                            style={{
                                flex: 1,
                                overflowY: "auto",
                                overscrollBehavior: "contain",
                                padding: "16px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "8px",
                            }}
                        >
                            {isLoading ? (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", gap: "14px" }}>
                                    <Loader2 size={28} style={{ color: "var(--accent)", animation: "spin 1s linear infinite" }} />
                                    <p style={{ color: "var(--muted)", fontSize: "0.875rem" }}>Searching documents...</p>
                                </div>
                            ) : query === "" ? (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", textAlign: "center", gap: "14px" }}>
                                    <div style={{ width: 60, height: 60, borderRadius: "18px", background: "var(--surface-hover)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)" }}>
                                        <History size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", fontWeight: 700 }}>Search the Archives</h3>
                                        <p style={{ color: "var(--muted)", fontSize: "0.875rem", maxWidth: "260px", lineHeight: 1.6 }}>Enter a topic, era, or historical figure to begin your journey.</p>
                                    </div>
                                </div>
                            ) : results.length > 0 ? (
                                <>
                                    <p style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--muted)", padding: "4px 8px 8px" }}>
                                        Found {results.length} {results.length === 1 ? "result" : "results"}
                                    </p>
                                    {results.map((result, index) => (
                                        <Link
                                            key={result.slug || `search-result-${index}`}
                                            href={`/article/${result.slug}`}
                                            onClick={onClose}
                                            style={{
                                                display: "flex",
                                                gap: "14px",
                                                padding: "12px",
                                                borderRadius: "var(--radius-md)",
                                                textDecoration: "none",
                                                transition: "background 0.15s ease, border-color 0.15s ease",
                                                border: "1px solid transparent",
                                            }}
                                            className="hover:bg-[var(--surface-hover)] hover:border-[var(--border-color)] group"
                                        >
                                            {/* Thumbnail */}
                                            <div style={{ width: 72, height: 72, borderRadius: "var(--radius-sm)", overflow: "hidden", flexShrink: 0, position: "relative", background: "var(--surface-hover)" }}>
                                                {result.heroImage ? (
                                                    <Image
                                                        src={urlFor(result.heroImage).width(144).height(144).url()}
                                                        alt={result.title}
                                                        fill
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
                                                        <History size={22} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Text */}
                                            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                                                    <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                                        {result.category}
                                                    </span>
                                                    <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--muted)", flexShrink: 0 }} />
                                                    <span style={{ fontSize: "0.68rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "3px" }}>
                                                        <Clock size={9} /> {result.readingTime} min read
                                                    </span>
                                                </div>
                                                <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--foreground)", lineHeight: 1.3, marginBottom: "3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                                                    className="group-hover:text-[var(--accent)] transition-colors">
                                                    {result.title}
                                                </h4>
                                                <p style={{ fontSize: "0.8rem", color: "var(--muted)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 1, WebkitBoxOrient: "vertical" }}>
                                                    {result.excerpt}
                                                </p>
                                            </div>

                                            <div style={{ display: "flex", alignItems: "center", paddingRight: "4px", opacity: 0, flexShrink: 0 }} className="group-hover:opacity-100 transition-opacity">
                                                <ArrowRight size={16} style={{ color: "var(--accent)" }} />
                                            </div>
                                        </Link>
                                    ))}
                                </>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 0", textAlign: "center", gap: "14px" }}>
                                    <div style={{ width: 60, height: 60, borderRadius: "18px", background: "var(--surface-hover)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
                                        <Search size={28} />
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: "1.05rem", marginBottom: "6px", fontWeight: 700 }}>No results found</h3>
                                        <p style={{ color: "var(--muted)", fontSize: "0.875rem", maxWidth: "260px", lineHeight: 1.6 }}>
                                            No articles match &quot;{query}&quot;. Try different keywords.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div
                            style={{
                                padding: "10px 20px",
                                background: "var(--surface-hover)",
                                borderTop: "1px solid var(--border-color)",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                flexShrink: 0,
                            }}
                        >
                            <div style={{ display: "flex", gap: "14px" }}>
                                <span style={{ fontSize: "0.68rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <kbd style={{ padding: "2px 5px", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "4px", fontSize: "0.58rem", fontFamily: "monospace" }}>ESC</kbd>
                                    to close
                                </span>
                                <span style={{ fontSize: "0.68rem", color: "var(--muted)", display: "flex", alignItems: "center", gap: "5px" }}>
                                    <kbd style={{ padding: "2px 5px", background: "var(--surface)", border: "1px solid var(--border-color)", borderRadius: "4px", fontSize: "0.58rem", fontFamily: "monospace" }}>↵</kbd>
                                    to open
                                </span>
                            </div>
                            <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--accent)" }}>JHRC Search</span>
                        </div>
                    </motion.div>

                    <style>{`
                        @keyframes spin { to { transform: rotate(360deg); } }
                    `}</style>
                </>
            )}
        </AnimatePresence>
    );
}
