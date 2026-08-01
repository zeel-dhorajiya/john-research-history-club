"use client";

import dynamic from "next/dynamic";

const PdfFlipbook = dynamic(() => import("./PdfFlipbook"), {
  ssr: false,
});

export default function ClientPdfReader({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  return <PdfFlipbook pdfUrl={pdfUrl} title={title} />;
}
