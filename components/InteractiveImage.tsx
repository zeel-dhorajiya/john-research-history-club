"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, Download, Maximize2 } from "lucide-react";

interface InteractiveImageProps {
    src: string;
    alt: string;
    caption?: string;
    aspectRatio?: string;
    className?: string;
    fill?: boolean;
}

export default function InteractiveImage({
    src,
    alt,
    caption,
    aspectRatio = "16/9",
    className = "",
    fill = false,
}: InteractiveImageProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            if ((window as any).lenis) (window as any).lenis.stop();
        } else {
            document.body.style.overflow = "unset";
            if ((window as any).lenis) (window as any).lenis.start();
        }
        return () => {
            document.body.style.overflow = "unset";
            if ((window as any).lenis) (window as any).lenis.start();
        };
    }, [isOpen]);

    return (
        <>
            <motion.div
                layoutId={`image-${src}`}
                onClick={() => setIsOpen(true)}
                className={`group relative overflow-hidden cursor-zoom-in ${!fill ? 'shadow-2xl' : ''} ${className}`}
                style={{
                    width: '100%',
                    height: fill ? '100%' : 'auto',
                    aspectRatio: fill ? 'unset' : aspectRatio,
                    borderRadius: fill ? '0' : '24px',
                }}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 1200px) 100vw, 800px"
                    className="transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white/20 backdrop-blur-xl p-4 rounded-full border border-white/30 text-white shadow-2xl"
                    >
                        <ZoomIn size={28} strokeWidth={2.5} />
                    </motion.div>
                </div>

                {caption && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <p className="text-sm font-medium tracking-wide">{caption}</p>
                    </div>
                )}
            </motion.div>

            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg p-4 md:p-12 cursor-zoom-out"
                        onClick={() => setIsOpen(false)}
                    >
                        {/* Close button */}
                        <motion.button
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute top-8 right-8 z-[10000] text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-2xl border border-white/20 transition-all"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsOpen(false);
                            }}
                        >
                            <X size={24} />
                        </motion.button>

                        {/* Image Container */}
                        <motion.div
                            layoutId={`image-${src}`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative w-full max-w-6xl max-h-[85vh] h-full flex flex-col items-center justify-center mx-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full flex-1 min-h-0 group mb-6">
                                <Image
                                    src={src}
                                    alt={alt}
                                    fill
                                    style={{ objectFit: 'contain' }}
                                    priority
                                    className="drop-shadow-[0_0_50px_rgba(255,255,255,0.1)]"
                                />
                            </div>

                            <div className="flex flex-col items-center shrink-0">
                                {/* Caption & Info */}
                                {(caption || alt) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-center max-w-2xl px-6 mb-6"
                                    >
                                        <h4 className="text-white text-xl font-bold tracking-tight mb-2">
                                            {caption || "Image Detail"}
                                        </h4>
                                        <p className="text-white/50 text-sm font-medium uppercase tracking-[0.2em]">
                                            {alt || "John Research History Club"}
                                        </p>
                                    </motion.div>
                                )}

                                {/* Tool buttons */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="flex gap-4"
                                >
                                    <a
                                        href={src}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors shadow-2xl"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Download size={18} /> Download
                                    </a>
                                    <button
                                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-sm hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all shadow-2xl"
                                        onClick={() => {
                                            if (document.fullscreenElement) {
                                                document.exitFullscreen();
                                            } else {
                                                document.documentElement.requestFullscreen();
                                            }
                                        }}
                                    >
                                        <Maximize2 size={18} /> Fullscreen
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
