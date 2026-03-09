"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Landmark, Crown, Swords, Pickaxe, User } from "lucide-react";
import { SanityCategory } from "@/lib/types";

const iconMap: Record<string, any> = {
    temple: Landmark,
    crown: Crown,
    swords: Swords,
    shovel: Pickaxe,
    person: User,
};

interface CategoryCardProps {
    category: SanityCategory;
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
            whileHover={{ y: -8 }}
        >
            <Link
                href={`/category/${category.slug}`}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "48px 24px",
                    borderRadius: "32px",
                    background: "var(--surface)",
                    border: "1px solid var(--border-color)",
                    textDecoration: "none",
                    gap: "24px",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                    boxShadow: "var(--shadow-md)",
                }}
                className="group hover:bg-[var(--surface-hover)] hover:shadow-[var(--shadow-lg)]"
            >
                <div
                    style={{
                        color: "var(--accent)",
                        transition: "transform 0.3s ease",
                    }}
                    className="group-hover:scale-110"
                >
                    <Icon size={48} strokeWidth={1.5} />
                </div>

                <div
                    style={{
                        fontWeight: 800,
                        fontSize: "1.2rem",
                        color: "var(--foreground)",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {category.title}
                </div>
            </Link>
        </motion.div>
    );
}
