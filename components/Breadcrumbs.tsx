"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
    items: {
        label: string;
        href?: string;
    }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav 
            aria-label="Breadcrumb" 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                marginBottom: '24px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--muted)',
                letterSpacing: '0.02em'
            }}
        >
            <Link 
                href="/" 
                style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'var(--muted)', 
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                }}
                className="hover:text-[var(--accent)]"
            >
                <Home size={14} style={{ marginRight: '4px' }} />
                Home
            </Link>

            {items.map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ChevronRight size={14} style={{ opacity: 0.5 }} />
                    {item.href ? (
                        <Link 
                            href={item.href}
                            style={{ 
                                color: 'var(--muted)', 
                                textDecoration: 'none',
                                transition: 'color 0.2s ease'
                            }}
                            className="hover:text-[var(--accent)]"
                        >
                            {item.label}
                        </Link>
                    ) : (
                        <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{item.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
