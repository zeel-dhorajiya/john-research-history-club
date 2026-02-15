import { Navbar } from "@/components/layout/Navbar";
import { ArrowLeft, Clock, Share2, Bookmark } from "lucide-react";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { groq } from "next-sanity";

// This component will fetch data from Sanity
async function getArticle(slug: string) {
    // We use params as the second argument to provide the $slug variable
    return client.fetch(
        groq`*[_type == "article" && slug.current == $slug][0]`,
        { slug }
    );
}

// Next.js 15+ uses async params
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await getArticle(slug);

    if (!article) {
        return (
            <main className="min-h-screen bg-background flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-serif font-bold text-white">Record Not Found</h1>
                <p className="text-muted-foreground italic">This chapter of history is yet to be written.</p>
                <Link href="/articles" className="text-primary font-bold uppercase tracking-widest hover:underline">
                    Return to Archive
                </Link>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background pb-20">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                {article.mainImage && (
                    <img
                        src={urlFor(article.mainImage).url()}
                        alt={article.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 py-20">
                    <div className="container mx-auto px-6 max-w-4xl space-y-6">
                        <Link href="/articles" className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] hover:translate-x--1 transition-transform mb-8">
                            <ArrowLeft className="h-4 w-4" /> Back to Archive
                        </Link>

                        <div className="space-y-4">
                            <span className="bg-primary/20 border border-primary/30 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                {article.category}
                            </span>
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient leading-tight">
                                {article.title}
                            </h1>
                            {article.subtitle && (
                                <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl italic">
                                    "{article.subtitle}"
                                </p>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-white/10 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-primary" /> {article.readTime || '5 min read'}
                            </div>
                            <div>By Archival Team</div>
                            <div>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Draft'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Body */}
            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 py-20 relative">

                {/* Left Sidebar */}
                <div className="hidden lg:block lg:col-span-3 sticky top-32 h-fit space-y-12">
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Interactions</h4>
                        <div className="flex flex-col gap-4">
                            <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors group">
                                <Bookmark className="h-4 w-4 group-hover:text-primary" /> Save Entry
                            </button>
                            <button className="flex items-center gap-3 text-sm text-muted-foreground hover:text-white transition-colors group">
                                <Share2 className="h-4 w-4 group-hover:text-primary" /> Share Data
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <article className="lg:col-span-6 space-y-10">
                    <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-sans italic opacity-60">
                        [Connect a Portable Text renderer to visualize the rich text sagas.]
                    </p>
                    {/* We can add @portabletext/react later to show the actual paragraphs */}
                </article>

                {/* Right Sidebar */}
                <div className="hidden lg:block lg:col-span-3 sticky top-32 h-fit space-y-8">
                    <div className="p-8 rounded-3xl bg-secondary border border-white/5 space-y-6 text-center">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Region</h4>
                        <p className="text-xl font-serif font-bold">{article.region || 'Global'}</p>
                        <hr className="opacity-10" />
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary">Era</h4>
                        <p className="text-xl font-serif font-bold">{article.era || 'Unknown'}</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
