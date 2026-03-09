"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLElement>(null);
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
        <section
            ref={containerRef}
            id="hero"
            style={{
                maxWidth: "min(var(--hero-width), calc(100vw - 48px))",
                margin: "calc(var(--nav-height) + var(--layout-margin) * 2) auto 0",
                padding: "0",
            }}
        >
            <div
                style={{
                    position: "relative",
                    width: "100%",
                    height: "var(--hero-height)",
                    borderRadius: "40px",
                    overflow: "hidden",
                    background: "#000",
                    boxShadow: "var(--shadow-xl)",
                }}
                onClick={togglePlay}
            >
                {/* Native Trailer Video */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 1,
                    }}
                >
                    <source src="/trailer.mp4" type="video/mp4" />
                </video>

                {/* Subtle Overlay */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 2,
                        background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)",
                        pointerEvents: "none"
                    }}
                />

                {/* Text Content Area (Bottom Left) - Unchanged positioning */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "48px",
                        left: "48px",
                        zIndex: 5,
                        textAlign: "left",
                        maxWidth: "60%",
                        pointerEvents: "none"
                    }}
                >
                    <motion.h1
                        style={{
                            fontSize: "clamp(2rem, 5vw, 4rem)",
                            fontWeight: 800,
                            color: "white",
                            letterSpacing: "-0.04em",
                            lineHeight: 1,
                            marginBottom: "16px",
                            textShadow: "0 2px 10px rgba(0,0,0,0.3)"
                        }}
                    >
                        Journey Through Time
                    </motion.h1>
                    <motion.p
                        style={{
                            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
                            color: "rgba(255,255,255,0.8)",
                            fontWeight: 400,
                            textShadow: "0 1px 5px rgba(0,0,0,0.3)"
                        }}
                    >
                        Discover the Secrets of Ancient History
                    </motion.p>
                </div>

                {/* Controls Area (Bottom Right) */}
                <div
                    style={{
                        position: "absolute",
                        bottom: "48px",
                        right: "48px",
                        zIndex: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                    }}
                >
                    {/* Mute Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleMute}
                        style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                    </motion.button>

                    {/* Morphing Play Trailer / Pause Button */}
                    <motion.button
                        layout
                        onClick={togglePlay}
                        initial={false}
                        animate={{
                            width: isPlaying ? "56px" : "auto",
                            padding: isPlaying ? "0px" : "16px 32px",
                            borderRadius: isPlaying ? "50%" : "20px",
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        style={{
                            height: "56px",
                            background: isPlaying ? "rgba(255,255,255,0.15)" : "var(--accent)",
                            backdropFilter: "blur(12px)",
                            border: isPlaying ? "1px solid rgba(255,255,255,0.3)" : "none",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "12px",
                            color: isPlaying ? "white" : "#000",
                            cursor: "pointer",
                            boxShadow: isPlaying ? "none" : "0 10px 20px rgba(200,169,106,0.3)",
                            overflow: "hidden",
                        }}
                    >
                        {isPlaying ? (
                            <Pause size={24} fill="currentColor" />
                        ) : (
                            <>
                                <Play size={20} fill="currentColor" />
                                <span style={{ fontWeight: 800, whiteSpace: "nowrap", fontSize: "1rem" }}>Play Trailer</span>
                            </>
                        )}
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
