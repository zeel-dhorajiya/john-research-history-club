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
        <section className="container mx-auto px-6 py-24 md:py-48">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div className="space-y-6">
                    <span className="text-caption">Curated Selection</span>
                    <h2 className="heading-lg">
                        Selected <span className="italic font-light text-primary">Discoveries</span>
                    </h2>
                    <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
                        Hand-picked entries from our database, verified by historians and
                        preserved for the future of human understanding.
                    </p>
                </div>
                <Link href="/articles" className="text-[10px] font-bold tracking-[0.3em] uppercase border-b border-primary/30 hover:border-primary hover:text-primary transition-all pb-2 mb-2">
                    Explore Full Archive
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[350px]">
                {articles.map((item: any, i: number) => (
                    <Link
                        key={i}
                        href={`/articles/${item.slug}`}
                        className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-secondary flex flex-col justify-end p-10 transition-all hover:border-primary/30 shadow-xl ${i === 0 ? "md:col-span-2 md:row-span-2" : "col-span-1"}`}
                    >
                        {/* BG Image */}
                        <div className="absolute inset-0 z-0">
                            {item.img ? (
                                <img src={urlFor(item.img).url()} alt={item.title} className="w-full h-full object-cover opacity-30 group-hover:scale-105 group-hover:opacity-50 transition-all duration-1000" />
                            ) : (
                                <div className="w-full h-full bg-primary/5" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                        </div>

                        <div className="relative z-10 space-y-4">
                            <span className="text-[10px] font-bold tracking-[0.4em] text-primary/80 uppercase">{item.category}</span>
                            <div className="flex justify-between items-start gap-6">
                                <h3 className={`${i === 0 ? "text-4xl md:text-5xl" : "text-2xl"} font-serif font-bold group-hover:text-primary transition-colors leading-tight`}>{item.title}</h3>
                                <ArrowUpRight className="h-6 w-6 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-primary shrink-0" />
                            </div>
                            <p className="text-base text-muted-foreground/80 line-clamp-2 max-w-sm leading-relaxed">
                                {item.subtitle}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
