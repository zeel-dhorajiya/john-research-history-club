export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1549419194-e8f00db72f2d?q=80&w=2070&auto=format&fit=crop")' }}
        />
        <div className="absolute inset-0 bg-black/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center space-y-12 max-w-6xl">
        <div className="space-y-6">
          <span className="text-caption animate-in fade-in slide-in-from-bottom-2 duration-700">
            Est. 2026 • The Human Story
          </span>
          <h1 className="heading-xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="text-gradient">Echoes of</span> <br />
            <span className="italic font-light text-primary/95 ml-1 md:ml-4">Eternity</span>
          </h1>
        </div>

        <p className="text-lg md:text-2xl text-muted-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          A definitive curated archive of civilizations, artifacts, and the relentless
          march of time. Designed for the guardians of history.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-8 pt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <button className="px-12 py-5 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-2xl gold-glow tracking-widest text-[10px] uppercase">
            Begin Exploration
          </button>
          <button className="px-12 py-5 glass text-white font-bold rounded-full hover:bg-white/10 transition-all tracking-widest text-[10px] uppercase">
            View Collections
          </button>
        </div>
      </div>

      {/* Side "Data" stats for techy/pro feel */}
      <div className="absolute bottom-16 left-16 hidden lg:block text-left border-l border-primary/20 pl-8 space-y-2 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Current Volume</p>
        <p className="text-3xl font-serif">XV.842</p>
        <p className="text-[10px] text-muted-foreground/60 font-sans tracking-widest">ENCODED ARCHIVE DATA</p>
      </div>

      <div className="absolute bottom-16 right-16 hidden lg:block text-right border-r border-primary/20 pr-8 space-y-2 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase">Epoch Range</p>
        <p className="text-3xl font-serif">10k BC - Present</p>
        <p className="text-[10px] text-muted-foreground/60 font-sans tracking-widest">GLOBAL CHRONOLOGY</p>
      </div>
    </section>
  );
}
