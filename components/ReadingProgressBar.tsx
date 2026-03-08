"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ReadingProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "var(--accent)",
                transformOrigin: "0%",
                zIndex: 10000,
                scaleX,
                boxShadow: "0 0 10px rgba(200, 169, 106, 0.4)",
            }}
        />
    );
}
