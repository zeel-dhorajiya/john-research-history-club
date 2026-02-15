import Link from "next/link";
import { Search, Menu, Library, Command } from "lucide-react";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-[100] pt-6 px-6 md:px-12 pointer-events-none">
            <nav className="container mx-auto max-w-7xl h-16 glass rounded-none border-x-0 border-t-0 border-b border-white/10 flex items-center justify-between px-0 md:px-4 pointer-events-auto">
                <Link href="/" className="flex items-center gap-4 group">
                    <div className="bg-primary p-1.5 rotate-45 group-hover:rotate-90 transition-transform duration-500">
                        <Library className="h-4 w-4 text-black -rotate-45 group-hover:-rotate-90 transition-transform duration-500" />
                    </div>
                    <span className="text-xl font-serif font-black tracking-tighter uppercase">
                        ARCHIVE<span className="text-primary ml-1">.</span>
                    </span>
                </Link>

                <div className="hidden md:flex gap-12 items-center text-[10px] font-bold tracking-[0.25em] text-muted-foreground uppercase">
                    <Link href="/timeline" className="hover:text-primary transition-colors">Timeline</Link>
                    <Link href="/maps" className="hover:text-primary transition-colors">Cartography</Link>
                    <Link href="/articles" className="hover:text-primary transition-colors">Encyclopedia</Link>
                </div>

                <div className="flex items-center gap-8">
                    <button className="hidden md:flex items-center gap-3 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all text-muted-foreground hover:text-white group border border-white/5">
                        <Search className="h-3.5 w-3.5" />
                        <span className="text-[10px] font-bold tracking-widest uppercase">Search</span>
                        <div className="flex items-center gap-1 opacity-40">
                            <Command className="h-3 w-3" />
                            <span className="text-[10px]">K</span>
                        </div>
                    </button>
                    <div className="h-4 w-[1px] bg-white/10 hidden md:block" />
                    <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary hover:text-white transition-colors">
                        Member Access
                    </button>
                    <button className="md:hidden p-2 text-white">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </nav>
        </header>
    );
}
