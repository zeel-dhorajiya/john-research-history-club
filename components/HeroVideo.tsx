"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const togglePlay = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <section
                id="hero"
                className="hero-section"
                style={{ padding: 0 }}
                onClick={togglePlay}
            >
                {/* ── Video fills the container exactly (no crop) ── */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="hero-video"
                >
                    <source src="/trailer.mp4" type="video/mp4" />
                </video>

                {/* Gradient overlay */}
                <div
                    className="hero-overlay"
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                        background:
                            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 55%, rgba(0,0,0,0.35) 100%)",
                        pointerEvents: "none",
                    }}
                />

                {/* Bottom-left: Title */}
                <div className="hero-text">
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        style={{
                            fontSize: "clamp(1.5rem, 5vw, 4rem)",
                            fontWeight: 800,
                            color: "white",
                            letterSpacing: "-0.04em",
                            lineHeight: 1,
                            marginBottom: "12px",
                            textShadow: "0 2px 10px rgba(0,0,0,0.4)",
                        }}
                    >
                        Journey Through Time
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.15 }}
                        style={{
                            fontSize: "clamp(0.85rem, 1.5vw, 1.25rem)",
                            color: "rgba(255,255,255,0.8)",
                            fontWeight: 400,
                            textShadow: "0 1px 5px rgba(0,0,0,0.3)",
                        }}
                    >
                        Discover the Secrets of Ancient History
                    </motion.p>
                </div>

                {/* Bottom-right: Controls */}
                <div className="hero-controls">
                    {/* Mute */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                        aria-label="Toggle mute"
                        className="hero-btn hero-btn-circle"
                    >
                        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </motion.button>

                    {/* Play / Pause */}
                    <motion.button
                        layout
                        onClick={togglePlay}
                        initial={false}
                        animate={{
                            width: isPlaying ? "44px" : "auto",
                            padding: isPlaying ? "0" : "0 24px",
                            borderRadius: isPlaying ? "50%" : "22px",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        aria-label="Toggle play"
                        style={{
                            height: 44,
                            background: isPlaying ? "rgba(255,255,255,0.15)" : "var(--accent)",
                            backdropFilter: "blur(12px)",
                            border: isPlaying ? "1px solid rgba(255,255,255,0.3)" : "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            color: isPlaying ? "white" : "#000",
                            cursor: "pointer",
                            whiteSpace: "nowrap",
                            fontSize: "0.88rem",
                            fontWeight: 700,
                            overflow: "hidden",
                        }}
                    >
                        {isPlaying ? (
                            <Pause size={20} fill="currentColor" />
                        ) : (
                            <>
                                <Play size={18} fill="currentColor" />
                                <span>Play Trailer</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </section>

            <style>{`
                /* =====================================================
                   DESKTOP (default)
                   Centered pill, width driven by --hero-width token
                   ===================================================== */
                .hero-section {
                    position: relative;
                    max-width: min(var(--hero-width), calc(100vw - 48px));
                    margin: calc(var(--nav-height) + var(--layout-margin) * 2) auto 0;
                    border-radius: 40px;
                    overflow: hidden;
                    background: #000;
                    box-shadow: var(--shadow-xl);
                    cursor: pointer;
                    height: var(--hero-height);
                }

                .hero-video {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: 1;
                }

                .hero-text {
                    position: absolute;
                    bottom: 48px;
                    left: 48px;
                    z-index: 5;
                    max-width: 60%;
                    pointer-events: none;
                }

                .hero-controls {
                    position: absolute;
                    bottom: 48px;
                    right: 48px;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .hero-btn-circle {
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.12);
                    backdrop-filter: blur(12px);
                    border: 1px solid rgba(255,255,255,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    cursor: pointer;
                }

                /* Mobile portrait: fill width, 16:9 height, starts below navbar */
                @media (max-width: 768px) and (orientation: portrait) {
                    .hero-section {
                        max-width: 100vw;
                        width: 100vw;
                        height: auto;
                        aspect-ratio: 16 / 9;
                        margin: calc(var(--nav-height) + 12px) 0 0 0;
                        border-radius: 0;
                        box-shadow: none;
                    }
                    .hero-text {
                        bottom: 16px;
                        left: 16px;
                        max-width: 70%;
                    }
                    .hero-controls {
                        bottom: 16px;
                        right: 16px;
                        gap: 8px;
                    }
                }

                /* =====================================================
                   MOBILE LANDSCAPE  (width > height, phone rotated)
                   Video fills full screen height, width = 16/9 of height
                   ===================================================== */
                @media (max-height: 600px) and (orientation: landscape) {
                    .hero-section {
                        /* Full height → width follows 16:9 */
                        height: 100dvh;
                        width: auto;
                        aspect-ratio: 16 / 9;
                        max-width: none;
                        margin: 0 auto;
                        border-radius: 0;
                        box-shadow: none;
                    }
                    .hero-text {
                        bottom: 12px;
                        left: 16px;
                        max-width: 55%;
                    }
                    .hero-controls {
                        bottom: 12px;
                        right: 16px;
                        gap: 8px;
                    }
                }
            `}</style>
        </>
    );
}
