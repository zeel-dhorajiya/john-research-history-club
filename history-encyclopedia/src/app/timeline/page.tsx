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
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - 400 : scrollLeft + 400;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen bg-background overflow-hidden flex flex-col">
            <Navbar />

            <div className="flex-1 flex flex-col justify-center px-6 py-20 relative">
                <div className="max-w-4xl mx-auto w-full mb-12 space-y-4">
                    <div className="flex items-center gap-3 text-primary">
                        <History className="h-6 w-6" />
                        <span className="text-xs font-bold tracking-[0.4em] uppercase">Chronograph Module</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-gradient">The Human <span className="italic font-light text-primary">Pulse</span></h1>
                    <p className="text-muted-foreground text-lg max-w-xl">
                        Slide through the millennia to witness the defining moments of our collective journey.
                    </p>
                </div>

                {/* Scroll Controls */}
                <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 z-20 flex justify-between pointer-events-none">
                    <button
                        onClick={() => scroll("left")}
                        className="p-4 rounded-full glass hover:bg-primary transition-all pointer-events-auto"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="p-4 rounded-full glass hover:bg-primary transition-all pointer-events-auto"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>

                {/* The Timeline Track */}
                <div
                    ref={scrollRef}
                    className="flex gap-12 overflow-x-auto scroll-smooth pb-20 pt-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                >
                    {/* Global Axis Line */}
                    <div className="absolute top-[65%] left-0 w-[5000px] h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent z-0" />

                    {TIMELINE_EVENTS.map((event, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="flex-shrink-0 w-[400px] group relative"
                        >
                            {/* Event Card */}
                            <div className="bg-secondary p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/20 transition-all hover:shadow-2xl hover:-translate-y-4 relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="text-[10px] font-bold tracking-widest text-primary uppercase">{event.era}</span>
                                    <span className="text-3xl font-serif font-black italic opacity-20">{event.year}</span>
                                </div>
                                <h3 className="text-2xl font-serif font-bold mb-4">{event.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {event.desc}
                                </p>
                                <button className="mt-8 text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors">
                                    Detail Archive &rarr;
                                </button>
                            </div>

                            {/* Connector Pin */}
                            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                                <div className="w-[1px] h-10 bg-primary/40" />
                                <div className="w-5 h-5 rounded-full border-2 border-primary bg-background group-hover:bg-primary transition-all" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

        </main>
    );
}
