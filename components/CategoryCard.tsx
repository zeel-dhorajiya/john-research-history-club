"use client";

import Link from "next/link";
import { Category } from "@/lib/data";
import { motion } from "framer-motion";
import { Landmark, Crown, Sword, Pickaxe, User } from "lucide-react";

// SVG Icons for categories
const iconMap: Record<string, any> = {
    temple: Landmark,
    crown: Crown,
    swords: Sword,
    shovel: Pickaxe,
    person: User,
};

interface CategoryCardProps {
    category: Category;
    index?: number;
}

export default function CategoryCard({ category, index = 0 }: CategoryCardProps) {
    const Icon = iconMap[category.icon] || User;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            style={{ height: "100%" }}
        >
            <Link
                href={`/category/${category.slug}`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 24px",
                    borderRadius: "var(--radius-lg)",
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    textDecoration: "none",
                    gap: "24px",
                    textAlign: "center",
                    transition: "all 0.4s cubic-bezier(0.2, 1, 0.3, 1)",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-md)",
                    position: "relative",
                    overflow: "hidden",
                }}
                className="group hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)]"
            >
                {/* Background Decoration */}
                <div
                    style={{
                        position: "absolute",
                        top: "-20px",
                        right: "-20px",
                        opacity: 0.03,
                        color: "var(--foreground)",
                        pointerEvents: "none",
                        transition: "opacity 0.3s ease",
                    }}
                    className="group-hover:opacity-10"
                >
                    <Icon size={120} />
                </div>

                {/* Icon circle */}
                <div
                    style={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        background: "var(--surface-hover)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                        transition: "all 0.4s ease",
                        zIndex: 1,
                        boxShadow: "0 0 0 0 rgba(200,169,106,0)",
                    }}
                    className="group-hover:bg-[var(--accent)] group-hover:text-white group-hover:shadow-[0_0_30px_rgba(200,169,106,0.3)]"
                >
                    <Icon size={32} strokeWidth={1.5} />
                </div>

                <div style={{ zIndex: 1 }}>
                    <div
                        style={{
                            fontWeight: 800,
                            fontSize: "1.1rem",
                            color: "var(--foreground)",
                            letterSpacing: "-0.02em",
                            marginBottom: "8px",
                        }}
                    >
                        {category.name}
                    </div>
                    <div
                        style={{
                            fontSize: "0.8rem",
                            color: "var(--muted)",
                            fontWeight: 600,
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {category.articleCount} Articles
                    </div>
                </div>

                {/* Hover accent line */}
                <div
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "0%",
                        height: "4px",
                        background: "var(--accent)",
                        transition: "width 0.4s ease",
                    }}
                    className="group-hover:width-full"
                />
            </Link>

            <style>{`
        .group-hover\\:width-full { width: 100% !important; }
      `}</style>
        </motion.div>
    );
}
