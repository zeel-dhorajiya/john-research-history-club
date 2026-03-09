import { createClient } from 'next-sanity';
import { articles, categories } from '../lib/data';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2023-05-03',
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN, // Requires a write token
});

async function uploadImage(imagePath: string) {
    try {
        const fullPath = path.join(process.cwd(), 'public', imagePath);
        if (!fs.existsSync(fullPath)) {
            console.warn(`File not found: ${fullPath}`);
            return null;
        }
        const imageData = fs.readFileSync(fullPath);
        const asset = await client.assets.upload('image', imageData, {
            filename: path.basename(imagePath),
        });
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id,
            },
        };
    } catch (error) {
        console.error(`Failed to upload image ${imagePath}:`, error);
        return null;
    }
}

function convertToPortableText(blocks: any[]) {
    return blocks.map((block) => {
        switch (block.type) {
            case 'heading':
                return {
                    _type: 'block',
                    style: block.level === 2 ? 'h2' : 'h3',
                    children: [{ _type: 'span', text: block.text }],
                };
            case 'paragraph':
                return {
                    _type: 'block',
                    style: 'normal',
                    children: [{ _type: 'span', text: block.text }],
                };
            case 'quote':
                return {
                    _type: 'block',
                    style: 'blockquote',
                    children: [{ _type: 'span', text: block.text }],
                };
            case 'divider':
                return { _type: 'divider' };
            default:
                return null;
        }
    }).filter(Boolean);
}

async function migrate() {
    console.log('🚀 Starting Migration...');

    if (!process.env.SANITY_WRITE_TOKEN) {
        console.error('❌ Error: SANITY_WRITE_TOKEN is missing in .env.local');
        return;
    }

    // 1. Migrate Categories
    const categoryIdMap: Record<string, string> = {};
    for (const cat of categories) {
        console.log(`📦 Migrating Category: ${cat.name}`);
        const doc = await client.createOrReplace({
            _type: 'category',
            _id: `category-${cat.slug}`,
            title: cat.name,
            slug: { _type: 'slug', current: cat.slug },
            description: cat.description,
            icon: cat.icon,
        });
        categoryIdMap[cat.slug] = doc._id;
    }

    // 2. Migrate Articles
    for (const article of articles) {
        console.log(`📝 Migrating Article: ${article.title}`);

        const heroImage = await uploadImage(article.image);
        const body = convertToPortableText(article.content);

        await client.createOrReplace({
            _type: 'article',
            _id: `article-${article.slug}`,
            title: article.title,
            slug: { _type: 'slug', current: article.slug },
            excerpt: article.excerpt,
            publishedAt: article.publishedAt,
            readingTime: article.readingTime,
            featured: article.featured,
            category: {
                _type: 'reference',
                _ref: categoryIdMap[article.categorySlug],
            },
            heroImage: heroImage || undefined,
            body: body,
        });
    }

    console.log('✅ Migration Complete!');
}

migrate().catch(console.error);
