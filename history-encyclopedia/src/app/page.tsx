import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { DiscoveryGrid } from "@/components/home/DiscoveryGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* Scrollable Container */}
      <div className="relative">
        <Hero />

        {/* Subtle separator */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mx-auto max-w-7xl" />

        <DiscoveryGrid />

        {/* Feature Quote Section */}
        <section className="section-padding bg-secondary border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2 opacity-50" />

          <div className="container mx-auto px-6 text-center max-w-5xl space-y-12 relative z-10">
            <span className="text-caption">The Historical Record</span>
            <blockquote className="heading-lg italic text-gradient px-4">
              "History is a vast early warning system, a mirror held up to the face of humanity."
            </blockquote>
            <div className="h-12 w-[1px] bg-primary/40 mx-auto" />
            <cite className="not-italic text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">— THE ARCHIVAL BOARD • VOLUME IV</cite>
          </div>
        </section>

        {/* Timeline Preview (Teaser) */}
        <section className="container mx-auto px-6 py-24 md:py-48">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
            <div className="flex-1 space-y-8">
              <span className="text-caption">Interactive Systems</span>
              <h2 className="heading-lg">The Great <span className="text-primary italic">Chronograph</span></h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed max-w-xl">
                Explore thousands of years through our interactive horizontal timeline.
                A tactile, visual journey from the dawn of speech to the digital era.
              </p>
              <div className="pt-4">
                <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-primary hover:text-white transition-all shadow-xl hover:shadow-primary/20">
                  Launch Timeline
                </button>
              </div>
            </div>
            <div className="flex-1 relative h-[500px] w-full bg-secondary rounded-[2.5rem] border border-white/10 flex items-center justify-center group overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?q=80&w=2128&auto=format&fit=crop')] bg-cover opacity-15 filter grayscale group-hover:scale-105 transition-transform duration-1000" />
              <div className="relative z-10 text-center space-y-4">
                <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-primary/60">Module XCII • Active</p>
                <p className="text-4xl md:text-6xl font-serif tracking-tighter">CHRONOLOGIZER</p>
              </div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="px-8 py-3 bg-white text-black font-bold tracking-widest uppercase text-[10px] rounded-full">Enter Module</span>
              </div>
            </div>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="pt-48 pb-16 bg-black border-t border-white/5">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-24">
              <div className="col-span-2 space-y-8">
                <h3 className="text-4xl font-serif font-bold tracking-tight">THE<span className="text-primary tracking-widest ml-1 uppercase text-xs">Archive</span></h3>
                <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
                  A non-profit initiative dedicated to the preservation of
                  global history and the democratization of knowledge through cinematic digital curation.
                </p>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">Archives</h4>
                <ul className="space-y-5 text-sm font-medium text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">Civilizations</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Artifacts</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Conflicts</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Philosophy</Link></li>
                </ul>
              </div>
              <div className="space-y-8">
                <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/50">Society</h4>
                <ul className="space-y-5 text-sm font-medium text-muted-foreground">
                  <li><Link href="#" className="hover:text-primary transition-colors">Join Member</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Donate</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Curators</Link></li>
                  <li><Link href="#" className="hover:text-primary transition-colors">Log In</Link></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-6 border-t border-white/10">
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-muted-foreground/60">&copy; 2026 THE ARCHIVE FOUNDATION. ALL RIGHTS RESERVED.</p>
              <div className="flex gap-10">
                <Link href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60 hover:text-white transition-colors">Privacy</Link>
                <Link href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60 hover:text-white transition-colors">Terms</Link>
                <Link href="#" className="text-[10px] font-bold tracking-[0.3em] uppercase text-muted-foreground/60 hover:text-white transition-colors">Cookies</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

// Utility Link for footer
function Link({ href, children, className }: { href: string, children: React.ReactNode, className?: string }) {
  return <a href={href} className={className}>{children}</a>
}
