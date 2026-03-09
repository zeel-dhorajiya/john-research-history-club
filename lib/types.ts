export interface SanityArticle {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    categorySlug: string;
    heroImage: any;
    image?: string; // Add back for local compatibility/fallback
    publishedAt: string;
    readingTime: number;
    body?: any[];
    featured?: boolean;
}

export interface SanityCategory {
    title: string;
    slug: string;
    description: string;
    icon?: string;
}
