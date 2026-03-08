import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { DiscoveryGrid } from "@/components/home/DiscoveryGrid";
import { ArrowRight, History, Globe, Compass, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      <div className="relative">
        <Hero />

        {/* Global Stats Bar - Sticky engagement */}
        <div className="sticky top-20 z-50 py-4 glass border-y border-white/5 opacity-0 animate-in fade-in duration-1000 delay-1000 fill-mode-forwards">
          <div className="container mx-auto px-12 flex justify-between items-center text-meta text-[9px]">
            <div className="flex gap-12">
              <span className="flex items-center gap-2"><Globe className="h-3 w-3" /> 14.2B YEARS OF DATA</span>
              <span className="flex items-center gap-2"><History className="h-3 w-3" /> 2,400+ CIVILIZATIONS</span>
            </div>
            <div className="flex gap-12">
              <span className="flex items-center gap-2 text-primary"><Compass className="h-3 w-3" /> EXPLORATION ACTIVE</span>
            </div>
          </div>
        </div>

        <DiscoveryGrid />

        {/* Feature Quote Section - Immersive Break */}
        <section className="section-padding bg-secondary border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" />

          <div className="container mx-auto px-6 text-center max-w-5xl space-y-16 relative z-10">
            <span className="text-meta">THE PHILOSOPHICAL ENGINE</span>
            <blockquote className="text-4xl md:text-7xl font-serif font-black leading-tight tracking-tighter text-gradient italic">
              "History is not a record of the past, but an illumination of the soul’s capacity for growth."
            </blockquote>
            <div className="flex items-center justify-center gap-6">
              <div className="h-px w-12 bg-primary/20" />
              <cite className="not-italic text-meta opacity-50">— THE ARCHIVAL BOARD • VOL. IV</cite>
              <div className="h-px w-12 bg-primary/20" />
            </div>
          </div>
        </section>

        {/* Chronograph Module - Ultra Cool CTA */}
        <section className="container mx-auto px-6 py-40 md:py-60">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <span className="text-meta">Interactive Core</span>
              <h2 className="heading-h1">THE GREAT <br /><span className="text-primary italic">CHRONOGRAPH.</span></h2>
              <p className="text-muted-foreground text-xl md:text-2xl leading-snug max-w-xl font-serif">
                A tactile, visual odyssey through the corridors of time.
                Experience history not as dates, but as a living, breathing pulse.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-6">
                <button className="button-premium flex items-center gap-4">
                  Launch Interface <ArrowRight className="h-4 w-4" />
                </button>
                <button className="px-8 py-4 text-meta border border-white/10 hover:bg-white/5 transition-all">
                  Documentation
                </button>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-video group cursor-none">
              <div className="absolute inset-0 bg-secondary border border-white/5 shadow-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=2128&auto=format&fit=crop"
                  className="w-full h-full object-cover opacity-20 filter grayscale scale-110 group-hover:scale-100 transition-all duration-[2s]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 border border-primary/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="w-32 h-32 border border-primary/40 rounded-full flex items-center justify-center animate-reverse-spin">
                      <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase">LINKED</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-12 left-12 space-y-2">
                <p className="text-meta text-primary">MODULE XCII // ACTIVE</p>
                <p className="text-3xl font-serif">TEMPORAL SCAN</p>
              </div>
              <div className="absolute top-12 right-12">
                <p className="text-[9px] font-mono text-primary/40 leading-none">
                  01001000 01001001 <br />
                  01010011 01010100 <br />
                  01001111 01010010 <br />
                  01011001
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Dark Footer */}
        <footer className="pt-60 pb-20 bg-black border-t border-white/5 overflow-hidden relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-20 pb-40">
              <div className="md:col-span-6 space-y-12">
                <h3 className="heading-h1 leading-none tracking-tighter">ARCHIVE<span className="text-primary">.</span></h3>
                <p className="text-muted-foreground max-w-md text-xl font-serif italic leading-relaxed">
                  "A non-profit initiative dedicated to the preservation of
                  global history and the democratization of knowledge through cinematic digital curation."
                </p>
                <div className="flex gap-8">
                  <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"><Globe className="h-4 w-4" /></div>
                  <div className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/5 transition-colors cursor-pointer"><BookOpen className="h-4 w-4" /></div>
                </div>
              </div>

              <div className="md:col-span-3 space-y-10">
                <h4 className="text-meta text-white/40">EXPLORATION</h4>
                <ul className="space-y-6 text-xl font-serif italic">
                  <li><a href="#" className="hover:text-primary transition-colors">Civilizations</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Artifacts</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Conflict Maps</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Philosophy</a></li>
                </ul>
              </div>

              <div className="md:col-span-3 space-y-10">
                <h4 className="text-meta text-white/40">CONNECT</h4>
                <div className="space-y-8">
                  <p className="text-muted-foreground text-sm font-medium">Join 50k+ explorers receiving weekly historical deep-dives.</p>
                  <div className="flex border-b border-white/20 pb-2">
                    <input type="email" placeholder="YOUR EMAIL" className="bg-transparent border-none outline-none text-[10px] font-bold tracking-widest w-full uppercase" />
                    <button className="text-primary text-[10px] font-bold tracking-widest uppercase ml-4">JOIN</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-8 border-t border-white/5">
              <p className="text-meta text-white/20 tracking-[0.5em]">&copy; 2026 THE ARCHIVE FOUNDATION</p>
              <div className="flex gap-12 text-meta text-white/20 hover:text-white/60 transition-colors">
                <a href="#">PRIVACY</a>
                <a href="#">TERMS</a>
                <a href="#">DATA API</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
