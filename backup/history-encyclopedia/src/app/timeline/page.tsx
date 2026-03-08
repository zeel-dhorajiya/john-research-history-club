"use client"

import { Navbar } from "@/components/layout/Navbar";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { useRef } from "react";

const TIMELINE_EVENTS = [
    { era: "PRE-HISTORY", year: "3500 BC", title: "Invention of Writing", desc: "Sumerian cuneiform marks the transition into recorded human history." },
    { era: "BRONZE AGE", year: "2560 BC", title: "The Great Pyramid", desc: "Completion of the Pyramid of Khufu in Giza, Egypt." },
    { era: "ANTIQUITY", year: "753 BC", title: "Founding of Rome", desc: "The legendary founding of the city by Romulus." },
    { era: "ANTIQUITY", year: "331 BC", title: "Battle of Gaugamela", desc: "Alexander the Great decisively defeats the Persian Empire." },
    { era: "CLASSICAL", year: "44 BC", title: "Ides of March", desc: "Assassination of Julius Caesar and the end of the Roman Republic." },
    { era: "MEDIEVAL", year: "476 AD", title: "Fall of Rome", desc: "The deposition of Romulus Augustulus marks the end of Western Antiquity." },
    { era: "MEDIEVAL", year: "1066 AD", title: "Battle of Hastings", desc: "William the Conqueror secures the English throne." },
    { era: "RENAISSANCE", year: "1453 AD", title: "Fall of Byzantium", desc: "Constantinople falls to the Ottomans, ending the Roman lineage." },
    { era: "RENAISSANCE", year: "1492 AD", title: "The New World", desc: "Columbus reaches the Americas, changing global history forever." },
    { era: "MODERN", year: "1789 AD", title: "French Revolution", desc: "The rise of the citizen and the fall of the absolute monarchy." },
];

export default function TimelinePage() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - 450 : scrollLeft + 450;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen bg-background overflow-hidden flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col justify-center px-6 pt-40 md:pt-48 pb-24 relative">
                <div className="max-w-5xl mx-auto w-full mb-20 space-y-6">
                    <div className="flex items-center gap-4 text-primary">
                        <History className="h-5 w-5" />
                        <span className="text-caption">Chronograph Module XCII</span>
                    </div>
                    <h1 className="heading-lg">The Human <span className="text-gradient italic">Pulse</span></h1>
                    <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-2xl">
                        Slide through the millennia to witness the defining moments of our collective journey,
                        meticulously documented across the ages.
                    </p>
                </div>

                {/* Scroll Controls */}
                <div className="absolute top-[60%] -translate-y-1/2 left-8 right-8 z-20 flex justify-between pointer-events-none">
                    <button
                        onClick={() => scroll("left")}
                        className="p-5 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all pointer-events-auto shadow-2xl group"
                    >
                        <ChevronLeft className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-5 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all pointer-events-auto shadow-2xl group"
                    >
                        <ChevronRight className="h-7 w-7 group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* The Timeline Track */}
                <div
                    ref={scrollRef}
                    className="flex gap-16 overflow-x-auto scroll-smooth pb-32 pt-16 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-[10%]"
                >
                    {/* Global Axis Line */}
                    <div className="absolute top-[68%] left-0 w-[5000px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

                    {TIMELINE_EVENTS.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-[450px] group relative"
                        >
                            {/* Event Card */}
                            <div className="bg-secondary p-12 rounded-[3rem] border border-white/5 hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-6 relative z-10 shadow-xl">
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-[10px] font-bold tracking-[0.4em] text-primary/80 uppercase">{event.era}</span>
                                    <span className="text-4xl font-serif font-black italic opacity-10 group-hover:opacity-30 transition-opacity leading-none text-primary">{event.year}</span>
                                </div>
                                <h3 className="heading-md mb-6 group-hover:text-primary transition-colors">{event.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-base italic font-light">
                                    "{event.desc}"
                                </p>
                                <button className="mt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-primary/60 hover:text-primary transition-colors border-b border-primary/20 hover:border-primary pb-1">
                                    Detail Archive &rarr;
                                </button>
                            </div>

                            {/* Connector Pin */}
                            <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                                <div className="w-[1px] h-16 bg-primary/20 group-hover:h-20 transition-all duration-500" />
                                <div className="w-5 h-5 rounded-full border-2 border-primary/40 bg-background group-hover:bg-primary group-hover:border-primary transition-all duration-500 shadow-[0_0_20px_rgba(212,184,134,0.3)]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </main>
    );
}
