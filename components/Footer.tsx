import Link from "next/link";
import { History, Instagram, Twitter, Youtube, ArrowUpRight, Github } from "lucide-react";

const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/john_history_club/" },
    { icon: Twitter, href: "https://x.com/JohnHistoryClub" },
    { icon: Youtube, href: "https://www.youtube.com/@Smitkumarhirpara" },
];

const footerLinks = [
    { label: "Home", href: "/" },
    { label: "Ancient Civilizations", href: "/category/ancient-civilizations" },
    { label: "Empires", href: "/category/empires" },
    { label: "War & Battles", href: "/category/war-and-battles" },
    { label: "Archaeology", href: "/category/archaeology" },
    { label: "Historical Figures", href: "/category/historical-figures" },
];

export default function Footer() {
    return (
        <footer
            style={{
                background: "var(--primary)",
                color: "white",
                padding: "100px 24px 48px",
                marginTop: "0",
                position: "relative",
                borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
        >
            <div style={{ maxWidth: "1250px", margin: "0 auto" }}>
                {/* Main Footer Content */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                        gap: "80px",
                        marginBottom: "80px",
                    }}
                >
                    {/* Brand Identity */}
                    <div style={{ maxWidth: "360px" }}>
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                                marginBottom: "24px",
                            }}
                        >
                            <div
                                style={{
                                    width: 42,
                                    height: 42,
                                    borderRadius: "12px",
                                    background: "var(--accent)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow: "0 0 20px rgba(200,169,106,0.2)",
                                }}
                            >
                                <History color="white" size={24} />
                            </div>
                            <div>
                                <div
                                    style={{
                                        fontWeight: 900,
                                        fontSize: "1.25rem",
                                        color: "white",
                                        letterSpacing: "-0.02em",
                                        lineHeight: 1,
                                    }}
                                >
                                    JHRC
                                </div>
                                <div
                                    style={{
                                        fontSize: "0.65rem",
                                        color: "var(--accent)",
                                        letterSpacing: "0.2em",
                                        textTransform: "uppercase",
                                        fontWeight: 700,
                                        marginTop: "4px",
                                    }}
                                >
                                    History Club
                                </div>
                            </div>
                        </div>
                        <p
                            style={{
                                fontSize: "1rem",
                                lineHeight: 1.8,
                                color: "rgba(255,255,255,0.5)",
                                marginBottom: "32px",
                            }}
                        >
                            We are a community of historians, researchers, and enthusiasts dedicated to preserving the echoes of the past for future generations.
                        </p>
                        <div style={{ display: "flex", gap: "16px" }}>
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            width: 40,
                                            height: 40,
                                            borderRadius: "50%",
                                            background: "rgba(255,255,255,0.05)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "rgba(255,255,255,0.6)",
                                            transition: "all 0.3s ease"
                                        }}
                                        className="hover:bg-[var(--accent)] hover:text-white"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h4
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: 800,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--accent)",
                                marginBottom: "32px",
                            }}
                        >
                            Library
                        </h4>
                        <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {footerLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        fontSize: "1rem",
                                        color: "rgba(255,255,255,0.5)",
                                        textDecoration: "none",
                                        transition: "color 0.2s ease",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                    }}
                                    className="hover:text-white"
                                >
                                    {link.label}
                                    <ArrowUpRight size={14} style={{ opacity: 0 }} className="link-arrow" />
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Inspirational Quote */}
                    <div>
                        <h4
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: 800,
                                letterSpacing: "0.15em",
                                textTransform: "uppercase",
                                color: "var(--accent)",
                                marginBottom: "32px",
                            }}
                        >
                            Philosophy
                        </h4>
                        <div
                            style={{
                                padding: "32px",
                                borderRadius: "var(--radius-lg)",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.05)",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "1.05rem",
                                    fontStyle: "italic",
                                    lineHeight: 1.6,
                                    color: "rgba(255,255,255,0.8)",
                                    marginBottom: "20px",
                                }}
                            >
                                &ldquo;To be ignorant of what occurred before you were born is to remain always a child.&rdquo;
                            </p>
                            <div
                                style={{
                                    fontSize: "0.85rem",
                                    color: "var(--accent)",
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                — Marcus Tullius Cicero
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        paddingTop: "40px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "24px",
                    }}
                >
                    <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)" }}>
                        &copy; {new Date().getFullYear()} John Research History Club. Designed for the curious.
                    </div>
                    <div style={{ display: "flex", gap: "32px" }}>
                        {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((text, i) => (
                            <a key={i} href="#" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", textDecoration: "none" }} className="hover:text-white">
                                {text}
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .hover\\:bg-\\[var\\(--accent\\)\\]:hover { background: var(--accent) !important; }
        .hover\\:text-white:hover { color: white !important; }
        .hover\\:text-white:hover .link-arrow { opacity: 1 !important; transform: translate(2px, -2px); }
        .link-arrow { transition: all 0.3s ease; }
      `}</style>
        </footer>
    );
}
