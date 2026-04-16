"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, History } from "lucide-react";
import SearchDialog from "./SearchDialog";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Pre History", href: "/category/pre-history" },
    { label: "Asian History", href: "/category/asian-history" },
    { label: "European History", href: "/category/european-history" },
    { label: "African History", href: "/category/african-history" },
    { label: "American History", href: "/category/american-continent" },
];

export default function Navbar() {
    const [offsetY, setOffsetY] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const lastScrollY = useRef(0);
    const NAV_TOTAL_HEIGHT = 120; // Enough to cover nav + safe area

    useEffect(() => {
        const onScroll = () => {
            const currentY = window.scrollY;
            const deltaY = currentY - lastScrollY.current;

            // Close menu on scroll (optional, but keep search open if we manage it separately)
            if (Math.abs(deltaY) > 5) {
                setMenuOpen(false);
            }

            setOffsetY((prev) => {
                let newOffset = prev;
                
                if (currentY <= 0) {
                    return 0; // Always show at very top
                }

                // Swapped: Subtract delta to make Scroll DOWN hide and Scroll UP show
                newOffset -= deltaY; 
                
                // Clamp between -NAV_TOTAL_HEIGHT and 0
                return Math.min(0, Math.max(-NAV_TOTAL_HEIGHT, newOffset));
            });

            lastScrollY.current = currentY;
        };
        
        // Close menu/search on scroll or outside click
        const handleClickOutside = (e: MouseEvent) => {
            if (menuOpen || searchOpen) {
                // We'll use a backdrop instead for better mobile behavior, 
                // but this listener helps for desktop edge cases.
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            {/* Backdrop for outside click/touch */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setMenuOpen(false);
                            setSearchOpen(false);
                        }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            background: "rgba(0,0,0,0.4)",
                            backdropFilter: "blur(4px)",
                            zIndex: 999,
                        }}
                    />
                )}
            </AnimatePresence>

            <SearchDialog 
                isOpen={searchOpen} 
                onClose={() => setSearchOpen(false)} 
            />

            {/* ── Scroll-reveal navbar ── */}
            <motion.nav
                initial={false}
                animate={{
                    y: offsetY,
                    opacity: 1, // Keep it solid while sliding
                }}
                transition={{ 
                    y: { type: "tween", ease: "linear", duration: 0 },
                    opacity: { duration: 0.35 }
                }}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: "var(--navbar-bg)",
                    backdropFilter: "blur(32px)",
                    WebkitBackdropFilter: "blur(32px)",
                    borderBottom: "1px solid var(--navbar-border)",
                    boxShadow: "var(--shadow-md)",
                    padding: "0 clamp(16px, 4vw, 40px)",
                    // Push content below safe area (notch / status bar)
                    paddingTop: "env(safe-area-inset-top, 0px)",
                }}
            >
                <div
                    style={{
                        maxWidth: "1400px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        height: "var(--nav-height)",
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
                            flexShrink: 0,
                        }}
                    >
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: "10px",
                                background: "var(--accent)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <History size={18} color="white" strokeWidth={2.5} />
                        </div>
                        <div className="hidden sm:block">
                            <div
                                style={{
                                    fontWeight: 900,
                                    fontSize: "1rem",
                                    letterSpacing: "-0.02em",
                                    color: "var(--foreground)",
                                    lineHeight: 1,
                                }}
                            >
                                JHRC
                            </div>
                            <div
                                style={{
                                    fontSize: "0.55rem",
                                    color: "var(--muted)",
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

                    {/* Desktop Links — centered */}
                    <div
                        className="hidden lg:flex"
                        style={{
                            alignItems: "center",
                            gap: "4px",
                            flex: 1,
                            justifyContent: "center",
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    padding: "8px 14px",
                                    borderRadius: "var(--radius-full)",
                                    fontSize: "0.88rem",
                                    fontWeight: 600,
                                    color: "var(--foreground)",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                    whiteSpace: "nowrap",
                                }}
                                className="hover:!text-[var(--accent)] hover:bg-[var(--surface-hover)]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            aria-label="Search"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--foreground)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                            }}
                            className="hover:bg-[var(--surface-hover)] hover:!text-[var(--accent)]"
                        >
                            {searchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        <div style={{ transform: "scale(0.9)" }}>
                            <ThemeToggle />
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden"
                            aria-label="Toggle menu"
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: "var(--foreground)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {menuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: "hidden", maxWidth: "1400px", margin: "0 auto" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "4px",
                                    paddingBottom: "20px",
                                    borderTop: "1px solid var(--border-color)",
                                    paddingTop: "12px",
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
                                            color: "var(--foreground)",
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
            </motion.nav>

            <style>{`
        .hidden { display: none !important; }
        @media (min-width: 640px)  { .sm\\:block { display: block !important; } }
        @media (min-width: 1024px) { .lg\\:flex  { display: flex !important;  } .lg\\:hidden { display: none !important; } }
      `}</style>
        </>
    );
}
