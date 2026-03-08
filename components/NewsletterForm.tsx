"use client";

import { useState } from "react";

export default function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) setSubmitted(true);
    };

    if (submitted) {
        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "32px",
                    background: "rgba(200,169,106,0.15)",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid rgba(200,169,106,0.3)",
                }}
            >
                <div style={{ fontSize: "2rem", marginBottom: "12px" }}>✓</div>
                <p
                    style={{
                        color: "white",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                        marginBottom: "6px",
                    }}
                >
                    You&apos;re subscribed!
                </p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
                    History is coming to your inbox.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                gap: "12px",
                flexWrap: "wrap",
                justifyContent: "center",
            }}
        >
            <input
                type="email"
                id="newsletter-email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                    flex: "1 1 240px",
                    padding: "14px 20px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.08)",
                    color: "white",
                    fontSize: "0.9rem",
                    outline: "none",
                    fontFamily: "inherit",
                }}
            />
            <button
                type="submit"
                style={{
                    padding: "14px 28px",
                    borderRadius: "var(--radius-full)",
                    background: "var(--accent)",
                    color: "white",
                    border: "none",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    flexShrink: 0,
                    transition: "background 0.2s ease",
                }}
            >
                Subscribe
            </button>
        </form>
    );
}
