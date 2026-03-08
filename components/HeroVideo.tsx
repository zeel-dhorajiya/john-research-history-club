"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroVideo() {
    const [playing, setPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();

    // Parallax and Scale effects
    const y = useTransform(scrollY, [0, 500], [0, 150]);
    const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const borderRadius = useTransform(scrollY, [0, 500], [0, 40]);

    const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
    const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

    const handlePlay = () => {
        setPlaying(true);
        videoRef.current?.play();
    };

    return (
        <section
            ref={containerRef}
            id="hero"
            style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                minHeight: "600px",
                overflow: "hidden",
                background: "#000",
            }}
        >
            {/* Background container that scales and moves */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    y: smoothY,
                    scale: smoothScale,
                    borderRadius,
                    overflow: "hidden",
                }}
            >
                {/* Background image (acts as video poster / fallback) */}
                {!playing && (
                    <motion.div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: "url('/hero_ancient_egypt.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                )}

                {/* Hidden video element (plays when play button clicked) */}
                <video
                    ref={videoRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: playing ? 1 : 0,
                        transition: "opacity 1s ease",
                        zIndex: 1,
                    }}
                    loop
                    muted
                    playsInline
                />

                {/* Gradient overlays */}
                <div className="hero-overlay" style={{ position: "absolute", inset: 0, zIndex: 2 }} />
                <div className="hero-gradient-fade" style={{ position: "absolute", inset: 0, zIndex: 3 }} />
            </motion.div>

            {/* Content */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0 24px",
                    textAlign: "center",
                    opacity,
                }}
            >
                {/* Category badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "10px",
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        borderRadius: "var(--radius-full)",
                        padding: "8px 20px",
                        marginBottom: "28px",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <div
                        style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: "var(--accent)",
                            boxShadow: "0 0 10px var(--accent)",
                        }}
                    />
                    <span
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "white",
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                        }}
                    >
                        John Research History Club
                    </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    style={{
                        fontSize: "clamp(3rem, 8vw, 6.5rem)",
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: "-0.04em",
                        lineHeight: 1,
                        marginBottom: "24px",
                        maxWidth: "1000px",
                    }}
                >
                    Journey <br className="hidden md:block" /> Through Time
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    style={{
                        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                        color: "rgba(255,255,255,0.7)",
                        fontWeight: 400,
                        marginBottom: "48px",
                        maxWidth: "600px",
                        lineHeight: 1.6,
                    }}
                >
                    Discover the Secrets of Ancient Civilizations that Shaped Modern Humanity.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <button
                        onClick={handlePlay}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px 36px",
                            borderRadius: "var(--radius-full)",
                            background: "white",
                            color: "#000",
                            border: "none",
                            fontSize: "0.95rem",
                            fontWeight: 800,
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Play Experience
                    </button>

                    <a
                        href="#featured"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            padding: "16px 36px",
                            borderRadius: "var(--radius-full)",
                            background: "rgba(255,255,255,0.1)",
                            color: "white",
                            border: "1px solid rgba(255,255,255,0.2)",
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        Explore Articles
                    </a>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                style={{
                    position: "absolute",
                    bottom: "40px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "10px" }}>Scroll</div>
                <div
                    style={{
                        width: "1px",
                        height: "60px",
                        background: "linear-gradient(to bottom, var(--accent), transparent)",
                        animation: "scrollLine 2s ease-in-out infinite",
                    }}
                />
            </motion.div>

            <style>{`
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
        </section>
    );
}
