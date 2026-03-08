import { Navbar } from "@/components/layout/Navbar";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ArrowUpRight, Search as SearchIcon } from "lucide-react";
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

            <div className="container mx-auto px-6 pt-48 pb-32 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
                    <div className="space-y-8 max-w-3xl">
                        <span className="text-meta">CORE REPOSITORY</span>
                        <h1 className="heading-h1">THE <span className="text-gradient italic">ENCYCLOPEDIA.</span></h1>
                        <p className="text-muted-foreground text-xl md:text-2xl leading-snug max-w-2xl font-serif">
                            Search across eras and regions. Every entry is a gateway to the past,
                            meticulously preserved for the modern scholar.
                        </p>
                    </div>
                    <div className="w-full md:w-auto">
                        <div className="flex items-center gap-4 border-b border-primary/20 pb-4 w-full md:w-80 opacity-60 hover:opacity-100 transition-opacity">
                            <SearchIcon className="h-4 w-4 text-primary" />
                            <input type="text" placeholder="FILTER BY EPOCH" className="bg-transparent border-none outline-none text-[10px] font-bold tracking-[0.3em] uppercase w-full" />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-32 border-b border-white/5 pb-12">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`px-10 py-4 text-[10px] font-bold tracking-[0.3em] uppercase transition-all ${cat === "ALL"
                                ? "bg-primary text-black"
                                : "bg-transparent text-muted-foreground hover:text-white border border-white/5 hover:border-white/10"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Results Grid */}
                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
                        {articles.map((item: any, i: number) => (
                            <Link
                                href={`/articles/${item.slug}`}
                                key={i}
                                className="group bg-secondary p-12 hover:bg-muted/30 transition-all duration-500 flex flex-col justify-between aspect-square"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <span className="text-meta text-primary">{item.era || 'Antiquity'}</span>
                                        <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-4xl font-serif font-bold leading-none tracking-tighter group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground/60 leading-relaxed font-serif italic line-clamp-3">
                                        "{item.subtitle}"
                                    </p>
                                </div>
                                <div className="pt-10 flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">{item.category}</span>
                                    {item.mainImage && (
                                        <div className="w-12 h-12 overflow-hidden grayscale group-hover:grayscale-0 group-hover:rotate-12 transition-all duration-700">
                                            <img src={urlFor(item.mainImage).url()} className="w-full h-full object-cover" alt="" />
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-40 text-center border border-white/5 bg-secondary/30">
                        <p className="text-muted-foreground italic font-serif text-2xl">Records currently inaccessible. Connect Archive Node.</p>
                    </div>
                )}
            </div>
        </main>
    );
}
