import type { Metadata } from "next";
import { Inter, Crimson_Pro } from "next/font/google"; // Crimson Pro is excellent for long-form reading
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-serif",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "THE ARCHIVE | World History Encyclopedia",
  description: "A cinematic journey through the corridors of human history.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${crimson.variable} antialiased font-sans selection:bg-primary/30 text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
