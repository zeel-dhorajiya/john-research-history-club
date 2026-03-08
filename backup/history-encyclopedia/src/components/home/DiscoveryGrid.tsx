import { ArrowUpRight } from "lucide-react";
import Link from 'next/link';
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";

async function getArticles() {
    return client.fetch(
        groq`*[_type == "article"] | order(publishedAt desc) [0...4] {
            title,
            category,
            "img": mainImage,
            subtitle,
            "slug": slug.current
        }`
    );
}

export async function DiscoveryGrid() {
    const articles = await getArticles();

    return (
        <section className="container mx-auto px-6 py-32 md:py-60 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-8">
                <div className="space-y-6">
                    <span className="text-meta">Curated Selection</span>
                    <h2 className="heading-h1">
                        SELECTED <span className="italic font-light text-primary">RECORDS.</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl text-xl leading-snug">
                        Hand-picked entries from our database, verified by historians and
                        preserved for the future of human understanding.
                    </p>
                </div>
                <div className="pt-4">
                    <Link href="/articles" className="text-[10px] font-bold tracking-[0.4em] uppercase border-b border-primary/40 hover:border-primary hover:text-primary transition-all pb-2">
                        Explore Full Archive
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[450px]">
                {articles.map((item: any, i: number) => (
                    <Link
                        key={i}
                        href={`/articles/${item.slug}`}
                        className={`group relative overflow-hidden bg-secondary card-hover flex flex-col justify-end p-12 ${i === 0 ? "md:col-span-2 md:row-span-2" : "md:col-span-2"}`}
                    >
                        {/* BG Image Layer */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            {item.img ? (
                                <img src={urlFor(item.img).url()} alt={item.title} className="w-full h-full object-cover opacity-20 filter grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-40 transition-all duration-1000" />
                            ) : (
                                <div className="w-full h-full bg-primary/5" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        </div>

                        <div className="relative z-10 space-y-6">
                            <span className="text-meta text-primary/80">{item.category}</span>
                            <div className="flex justify-between items-end">
                                <h3 className={`${i === 0 ? "text-5xl" : "text-3xl"} font-serif font-bold group-hover:text-primary transition-colors leading-none tracking-tighter`}>
                                    {item.title}
                                </h3>
                                <div className="bg-primary/10 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="h-5 w-5 text-primary" />
                                </div>
                            </div>
                            <p className="text-lg text-muted-foreground/60 line-clamp-2 max-w-sm leading-relaxed font-serif italic">
                                "{item.subtitle}"
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
