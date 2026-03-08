"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, History } from "lucide-react";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Ancient Civilizations", href: "/category/ancient-civilizations" },
    { label: "Empires", href: "/category/empires" },
    { label: "War & Battles", href: "/category/war-and-battles" },
    { label: "Archaeology", href: "/category/archaeology" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <nav
                style={{
                    position: "fixed",
                    top: scrolled ? "12px" : "24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,
                    width: "min(calc(100% - 32px), 1200px)",
                    borderRadius: scrolled ? "var(--radius-xl)" : "var(--radius-lg)",
                    background: scrolled ? "var(--navbar-bg)" : "rgba(0,0,0,0.15)",
                    backdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
                    WebkitBackdropFilter: scrolled ? "blur(20px)" : "blur(8px)",
                    border: scrolled ? "1px solid var(--navbar-border)" : "1px solid rgba(255,255,255,0.1)",
                    boxShadow: scrolled ? "var(--shadow-lg)" : "none",
                    transition: "all 0.5s cubic-bezier(0.2, 1, 0.3, 1)",
                    padding: "0 24px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: scrolled ? "64px" : "72px",
                        transition: "height 0.5s cubic-bezier(0.2, 1, 0.3, 1)",
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            textDecoration: "none",
                        }}
                    >
                        <div
                            style={{
                                width: 38,
                                height: 38,
                                borderRadius: "10px",
                                background: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: scrolled ? "none" : "0 0 20px rgba(200,169,106,0.3)",
                            }}
                        >
                            <History size={20} color="white" strokeWidth={2.5} />
                        </div>
                        <div className="hidden sm:block">
                            <div
                                style={{
                                    fontWeight: 900,
                                    fontSize: "1.05rem",
                                    letterSpacing: "-0.02em",
                                    color: scrolled ? "var(--foreground)" : "white",
                                    lineHeight: 1,
                                }}
                            >
                                JHRC
                            </div>
                            <div
                                style={{
                                    fontSize: "0.55rem",
                                    color: scrolled ? "var(--muted)" : "rgba(255,255,255,0.6)",
                                    letterSpacing: "0.15em",
                                    textTransform: "uppercase",
                                    fontWeight: 700,
                                    marginTop: "2px",
                                }}
                            >
                                History Club
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div
                        className="hidden lg:flex"
                        style={{
                            alignItems: "center",
                            gap: "8px",
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    padding: "8px 16px",
                                    borderRadius: "var(--radius-full)",
                                    fontSize: "0.88rem",
                                    fontWeight: 600,
                                    color: scrolled ? "var(--foreground)" : "rgba(255,255,255,0.9)",
                                    textDecoration: "none",
                                    transition: "all 0.3s ease",
                                }}
                                className="hover:!text-[var(--accent)] hover:bg-[var(--surface-hover)]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: scrolled ? "var(--foreground)" : "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.3s ease",
                            }}
                            className="hover:bg-[var(--surface-hover)] hover:!text-[var(--accent)]"
                        >
                            {searchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <div style={{ transform: "scale(0.9)" }}>
                            <ThemeToggle />
                        </div>

                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: scrolled ? "var(--foreground)" : "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{ paddingBottom: "20px" }}>
                                <input
                                    type="text"
                                    placeholder="Search historical topics..."
                                    autoFocus
                                    style={{
                                        width: "100%",
                                        padding: "16px 20px",
                                        borderRadius: "var(--radius-md)",
                                        border: "1px solid var(--border-color)",
                                        background: scrolled ? "var(--surface)" : "rgba(255,255,255,0.05)",
                                        color: scrolled ? "var(--foreground)" : "white",
                                        fontSize: "1rem",
                                        outline: "none",
                                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)",
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            style={{ overflow: "hidden" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "8px",
                                    paddingBottom: "24px",
                                    borderTop: "1px solid var(--border-color)",
                                    paddingTop: "16px",
                                }}
                            >
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setMenuOpen(false)}
                                        style={{
                                            padding: "12px 16px",
                                            borderRadius: "var(--radius-md)",
                                            fontSize: "1rem",
                                            fontWeight: 600,
                                            color: scrolled ? "var(--foreground)" : "white",
                                            textDecoration: "none",
                                        }}
                                        className="hover:bg-[var(--surface-hover)] hover:!text-[var(--accent)]"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <style>{`
        .hidden { display: none !important; }
        @media (min-sm) { .sm\\:block { display: block !important; } }
        @media (min-lg) { .lg\\:flex { display: flex !important; } .lg\\:hidden { display: none !important; } }
        
        @media (min-width: 640px) { .sm\\:block { display: block !important; } }
        @media (min-width: 1024px) { .lg\\:flex { display: flex !important; } .lg\\:hidden { display: none !important; } }
      `}</style>
        </>
    );
}
