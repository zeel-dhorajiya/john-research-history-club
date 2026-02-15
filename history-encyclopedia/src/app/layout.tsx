import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: 'swap',
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
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
    <html lang="en" className="dark">
      <body
        className={`${sans.variable} ${serif.variable} antialiased font-sans selection:bg-primary/30`}
      >
        {children}
      </body>
    </html>
  );
}
