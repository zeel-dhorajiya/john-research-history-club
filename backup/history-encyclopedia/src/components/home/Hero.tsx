export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1461360228754-6e81c478c882?q=80&w=2074&auto=format&fit=crop")' }} // Ancient city at sunset
        />
        <div className="absolute inset-0 bg-black/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center space-y-16 max-w-7xl pt-20">
        <div className="space-y-8">
          <span className="text-meta animate-in fade-in slide-in-from-bottom-2 duration-1000">
            EST. 2026 • GLOBAL CHRONICLE
          </span>
          <h1 className="heading-display animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-100">
            <span className="text-gradient">ECHOES OF</span> <br />
            <span className="italic font-light text-primary/95">ETERNITY.</span>
          </h1>
        </div>

        <p className="text-xl md:text-3xl text-muted-foreground/80 max-w-3xl mx-auto font-medium leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
          The definitive archive of human civilizations, artifacts, and the relentless
          march of time. Designed for modern explorers.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-10 pt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <button className="button-premium hover:scale-105 active:scale-95">
            Begin Exploration
          </button>
          <button className="px-12 py-5 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-all">
            View Collections
          </button>
        </div>
      </div>

      {/* Modern Data Ticker Style Footer Stats */}
      <div className="absolute bottom-12 left-0 right-0 px-20 hidden lg:flex justify-between items-end opacity-40 hover:opacity-100 transition-opacity duration-1000">
        <div className="flex gap-20">
          <div className="space-y-2">
            <p className="text-meta">Volume</p>
            <p className="text-4xl font-serif">XV.842</p>
          </div>
          <div className="space-y-2">
            <p className="text-meta">Epoch</p>
            <p className="text-4xl font-serif">10K BC</p>
          </div>
        </div>
        <div className="text-right space-y-2">
          <p className="text-meta">Status</p>
          <p className="text-xl font-sans font-bold tracking-widest uppercase">SYDNEY // GMT+11</p>
        </div>
      </div>
    </section>
  );
}
