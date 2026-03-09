import { articles as localArticles, categories as localCategories } from "./data";
import { SanityArticle, SanityCategory } from "./types";

export function getFallbackArticles(): SanityArticle[] {
    return localArticles.map((a) => ({
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        category: a.category,
        categorySlug: a.categorySlug,
        heroImage: null,
        image: a.image,
        publishedAt: a.publishedAt,
        readingTime: a.readingTime,
        featured: a.featured,
        body: [] // We don't need the full local content for previews
    }));
}

export function getFallbackCategories(): SanityCategory[] {
    return localCategories.map((c) => ({
        title: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon
    }));
}
