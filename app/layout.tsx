import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "JHRC – John Research History Club",
  description:
    "Journey through time with JHRC. Discover ancient civilizations, empires, wars, and the figures who shaped history.",
  keywords: [
    "history",
    "ancient civilizations",
    "empires",
    "archaeology",
    "JHRC",
    "Roman Empire",
    "Ancient Egypt",
  ],
  openGraph: {
    title: "JHRC – John Research History Club",
    description: "Discover the Secrets of Ancient History",
    type: "website",
  },
};

import type { Viewport } from "next";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on notched/status-bar devices
};

import SmoothScrolling from "@/components/SmoothScrolling";
import LayoutWrapper from "@/components/LayoutWrapper";

import NextTopLoader from 'nextjs-toploader';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased`}>
        <ThemeProvider>
          <NextTopLoader 
            color="var(--accent)" 
            showSpinner={false} 
            height={3} 
            shadow="0 0 10px var(--accent),0 0 5px var(--accent)" 
            zIndex={1600} 
          />
          <SmoothScrolling>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </SmoothScrolling>
        </ThemeProvider>
      </body>
    </html>
  );
}
