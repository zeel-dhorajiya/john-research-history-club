import Link from "next/link";
import { Search, Menu, Library } from "lucide-react";

export function Navbar() {
    return (
        <header className="fixed top-8 left-0 right-0 z-[100] px-6 md:px-0">
            <nav className="container mx-auto max-w-5xl h-16 glass rounded-full flex items-center justify-between px-8 border-white/5 shadow-2xl">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Library className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-2xl font-serif font-bold tracking-tight">
                        THE<span className="text-primary tracking-[0.3em] ml-2 uppercase text-[10px] font-sans font-bold">Archive</span>
                    </span>
                </Link>

                <div className="hidden md:flex gap-10 items-center text-[11px] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                    <Link href="/timeline" className="hover:text-primary transition-colors">Timeline</Link>
                    <Link href="/maps" className="hover:text-primary transition-colors">Maps</Link>
                    <Link href="/articles" className="hover:text-primary transition-colors">Encyclopedia</Link>
                </div>

                <div className="flex items-center gap-6">
                    <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-muted-foreground hover:text-white group">
                        <Search className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    </button>
                    <div className="h-5 w-[1px] bg-white/10 hidden md:block" />
                    <button className="hidden md:block text-[11px] font-bold uppercase tracking-[0.3em] text-primary hover:text-white transition-colors">
                        Sign In
                    </button>
                    <button className="md:hidden p-2">
                        <Menu className="h-5 w-5" />
                    </button>
                </div>
            </nav>
        </header>
    );
}
