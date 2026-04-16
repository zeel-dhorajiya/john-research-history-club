"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";

export default function Loading() {
    return (
        <div style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--background)",
            zIndex: 9999,
        }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                {/* Pulsing Logo */}
                <motion.div
                    animate={{
                        boxShadow: [
                            "0 0 0px rgba(200,169,106,0)",
                            "0 0 30px rgba(200,169,106,0.3)",
                            "0 0 0px rgba(200,169,106,0)"
                        ]
                    }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    style={{
                        width: 64,
                        height: 64,
                        borderRadius: "16px",
                        background: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <History size={32} color="white" />
                </motion.div>

                {/* Shimmer Text */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                    <div
                        style={{
                            fontWeight: 800,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            fontSize: "0.85rem",
                            color: "var(--muted)",
                        }}
                    >
                        Unearthing History...
                    </div>
                    {/* Shimmer effect running across the text */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: "linear-gradient(90deg, transparent, rgba(200,169,106,0.4), transparent)",
                            mixBlendMode: "screen",
                        }}
                    />
                </div>
            </motion.div>
        </div>
    );
}
