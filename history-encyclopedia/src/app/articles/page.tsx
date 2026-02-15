import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { groq } from "next-sanity";

async function getAllArticles() {
    return client.fetch(groq`*[_type == "article"] | order(publishedAt desc) {
    title,
    category,
    era,
    region,
    subtitle,
    "mainImage": mainImage,
    "slug": slug.current
  }`);
}

export default async function EncyclopediaPage() {
    const articles = await getAllArticles();

    const categories = ["ALL", "WARFARE", "ARTIFACTS", "KNOWLEDGE", "TECHNICAL", "PHILOSOPHY", "SCIENCE"];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 pt-48 pb-32">
                <div className="space-y-6 mb-20 max-w-3xl">
                    <span className="text-caption">Knowledge Repository</span>
                    <h1 className="heading-lg">The <span className="text-gradient italic">Encyclopedia</span></h1>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
                        Search across eras and regions. Every entry is a gateway to the past,
                        meticulously preserved for the modern scholar.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 mb-24">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`px-8 py-3 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${cat === "ALL"
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                : "bg-secondary text-muted-foreground hover:bg-white/5 border border-white/5 hover:border-primary/20"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results Grid */}
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {articles.map((item: any, i: number) => (
                            <Link
                                href={`/articles/${item.slug}`}
                                key={i}
                                className="group flex flex-col bg-secondary rounded-[3rem] border border-white/5 overflow-hidden hover:border-primary/20 transition-all hover:-translate-y-2 hover:shadow-2xl shadow-xl"
                            >
                                <div className="h-72 overflow-hidden relative">
                                    {item.mainImage ? (
                                        <img src={urlFor(item.mainImage).url()} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
                                    ) : (
                                        <div className="w-full h-full bg-primary/5" />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                                    <div className="absolute top-8 left-8 flex flex-col gap-2">
                                        <span className="bg-primary/95 text-primary-foreground text-[9px] font-bold px-4 py-1.5 rounded-full tracking-[0.2em] uppercase shadow-lg">
                                            {item.era || 'Antiquity'}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-12 flex-1 flex flex-col">
                                    <span className="text-[10px] font-bold tracking-[0.4em] text-primary/80 mb-5 uppercase">{item.category}</span>
                                    <div className="flex justify-between items-start gap-6 mb-6">
                                        <h3 className="text-3xl font-serif font-bold leading-tight group-hover:text-primary transition-colors">{item.title}</h3>
                                        <ArrowUpRight className="h-6 w-6 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0" />
                                    </div>
                                    <p className="text-base text-muted-foreground/70 leading-relaxed line-clamp-3">
                                        {item.subtitle}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center border-t border-white/5 rounded-[3rem] bg-secondary/30">
                        <p className="text-muted-foreground italic font-serif text-xl">Your archive is currently empty. Add articles in the admin studio!</p>
                    </div>
                )}
            </div>
        </main>
    );
}
