import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft, Clock, Share2, Bookmark, Heart, MessageSquare } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";

// This component will fetch data from Sanity
async function getArticle(slug: string) {
    return client.fetch(
        groq`*[_type == "article" && slug.current == $slug][0]`,
        { slug }
    );
}

// Get related articles to keep user reading
async function getRelatedArticles(category: string, currentSlug: string) {
    return client.fetch(
        groq`*[_type == "article" && category == $category && slug.current != $currentSlug] [0...3] {
            title,
            "slug": slug.current,
            "img": mainImage
        }`,
        { category, currentSlug }
    );
}

export async function generateStaticParams() {
    const sanitySlugs = await client.fetch(groq`*[_type == "article" && defined(slug.current)].slug.current`);
    return sanitySlugs.map((slug: string) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
                <h1 className="heading-h1 italic">Lost in Time.</h1>
                <p className="text-muted-foreground italic">This chapter of history is yet to be written.</p>
                <Link href="/articles" className="text-primary font-bold uppercase tracking-widest hover:underline">
                    Return to Archive
                </Link>
            </main>
        );
    }

    const related = await getRelatedArticles(article.category, slug);

    return (
        <main className="min-h-screen bg-background pb-40 relative">
            <div className="scroll-progress-bar" />
            <Navbar />

            {/* Immersive Header */}
            <div className="relative h-[85vh] w-full overflow-hidden">
                {article.mainImage && (
                    <img
                        src={urlFor(article.mainImage).url()}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-30 fixed top-0 left-0 -z-10"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />

                <div className="absolute bottom-0 left-0 right-0 py-32">
                    <div className="container mx-auto px-6 max-w-6xl space-y-12">
                        <Link href="/articles" className="group flex items-center gap-3 text-meta hover:text-white transition-colors">
                            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Knowledge Base
                        </Link>

                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <span className="bg-primary text-black text-[9px] font-bold px-4 py-1.5 uppercase tracking-[0.2em]">
                                    {article.category}
                                </span>
                                <span className="text-meta">{article.era || 'Antiquity'} // {article.region || 'Global'}</span>
                            </div>
                            <h1 className="heading-h1 text-white">
                                {article.title}
                            </h1>
                            {article.subtitle && (
                                <p className="text-2xl md:text-4xl text-muted-foreground font-serif leading-tight italic max-w-4xl">
                                    "{article.subtitle}"
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-12 pt-12 border-t border-white/5 text-meta">
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-primary" /> {article.readTime || '12 min read'}
                            </div>
                            <div>Curated by The Board</div>
                            <div>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'AD 2026'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Context */}
            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-20 py-20">
                {/* Left Interaction Sidebar */}
                <div className="hidden lg:block lg:col-span-1 sticky top-40 h-fit">
                    <div className="flex flex-col gap-10 items-center opacity-40 hover:opacity-100 transition-opacity">
                        <button className="group flex flex-col items-center gap-2">
                            <Heart className="h-5 w-5 group-hover:text-red-500 fill-none transition-colors" />
                            <span className="text-[10px] font-bold">1.2k</span>
                        </button>
                        <button className="group flex flex-col items-center gap-2">
                            <MessageSquare className="h-5 w-5 group-hover:text-primary transition-colors" />
                            <span className="text-[10px] font-bold">42</span>
                        </button>
                        <button className="group flex flex-col items-center gap-2">
                            <Bookmark className="h-5 w-5 group-hover:text-primary transition-colors" />
                        </button>
                        <button className="group flex flex-col items-center gap-2">
                            <Share2 className="h-5 w-5 group-hover:text-primary transition-colors" />
                        </button>
                    </div>
                </div>

                {/* Main Article Text */}
                <article className="lg:col-span-7 prose-custom">
                    <p>
                        The chronicles of {article.title} remain among the most fascinating records in our archive.
                        As we delve into the intricate systems and cultural frameworks of the {article.era || 'age'},
                        one begins to perceive the delicate threads that connect our modern existence to the
                        architectural foundations of the past.
                    </p>
                    <p>
                        It is said that to understand the future, one must first master the echoes of the previous millennia.
                        In this comprehensive study, we explore not just the events, but the philosophies that fueled
                        civilization's relentless momentum.
                    </p>
                    <div className="my-20 p-12 bg-secondary border border-white/5 italic text-muted-foreground relative">
                        <div className="absolute -top-6 -left-6 text-6xl text-primary opacity-20 font-serif">"</div>
                        History is not a burden on the memory, but an illumination of the soul.
                    </div>
                    <p>
                        [Rich content stream continues through the archival link...]
                    </p>
                </article>

                {/* Right Discovery Sidebar */}
                <div className="lg:col-span-4 space-y-16">
                    <div className="sticky top-40 space-y-12">
                        <div className="p-10 bg-secondary border border-white/5 space-y-8">
                            <h4 className="text-meta">Related Intelligence</h4>
                            <div className="space-y-8">
                                {related.map((rel: any, i: number) => (
                                    <Link key={i} href={`/articles/${rel.slug}`} className="group flex items-start gap-4">
                                        <div className="w-16 h-16 shrink-0 bg-muted overflow-hidden">
                                            {rel.img && <img src={urlFor(rel.img).url()} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />}
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-sm font-serif font-bold group-hover:text-primary transition-colors leading-tight">{rel.title}</p>
                                            <p className="text-[10px] text-meta opacity-50 uppercase">Read Entry &rarr;</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-10 border border-primary/20 bg-primary/5 rounded-none space-y-4">
                            <h4 className="text-meta text-primary">Archival Note</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed italic">
                                This record is part of Volume XV of the Global History Initiative.
                                Members get access to original primary source scans and 3D artifact reconstructions.
                            </p>
                            <button className="text-[10px] font-bold text-primary uppercase tracking-widest pt-2 hover:text-white transition-colors">
                                Join The Initiative &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
