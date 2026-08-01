"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, AlertCircle } from "lucide-react";

interface PdfFlipbookProps {
  pdfUrl: string;
  title: string;
}

export default function PdfFlipbook({ pdfUrl, title }: PdfFlipbookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const pageCacheRef = useRef<Map<number, any>>(new Map());

  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const mouseDownX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  
  const initialPinchDist = useRef<number | null>(null);
  const basePinchScale = useRef<number>(1);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isTwoPageSpread, setIsTwoPageSpread] = useState<boolean>(false);
  const [isToolbarVisible, setIsToolbarVisible] = useState<boolean>(true);
  const [jumpPage, setJumpPage] = useState<string>("");
  const [pinchScale, setPinchScale] = useState<number>(1);

  // Auto-detect fullscreen changes (e.g. hitting ESC)
  useEffect(() => {
    const onFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      if (!isFull) {
        setIsToolbarVisible(true);
        setPinchScale(1);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const effectiveIsTwoPageSpread = isFullscreen || isTwoPageSpread;

  useEffect(() => {
    const checkWidth = () => {
      setIsTwoPageSpread(window.innerWidth > 768);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    let isSubscribed = true;

    async function loadPdf() {
      try {
        setLoading(true);
        setError(null);

        const pdfjs = await import("pdfjs-dist");
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        const loadingTask = pdfjs.getDocument({
          url: pdfUrl,
          disableAutoFetch: true,
          disableStream: true,
          rangeChunkSize: 65536, // 64KB chunks
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
          cMapPacked: true,
        });

        const pdf = await loadingTask.promise;

        if (isSubscribed) {
          setPdfDoc(pdf);
          setTotalPages(pdf.numPages);
          setLoading(false);
        }
      } catch (err: any) {
        if (isSubscribed) {
          console.error("PDF load error:", err);
          setError("Unable to load book content. Please check back shortly.");
          setLoading(false);
        }
      }
    }

    loadPdf();

    return () => {
      isSubscribed = false;
      pageCacheRef.current.clear();
    };
  }, [pdfUrl]);

  const getPdfPage = useCallback(
    async (pageNum: number) => {
      if (!pdfDoc || pageNum < 1 || pageNum > totalPages) return null;
      if (pageCacheRef.current.has(pageNum)) {
        return pageCacheRef.current.get(pageNum);
      }
      try {
        const page = await pdfDoc.getPage(pageNum);
        pageCacheRef.current.set(pageNum, page);
        return page;
      } catch (e) {
        return null;
      }
    },
    [pdfDoc, totalPages]
  );

  const prefetchPagesWindow = useCallback(
    (centerPage: number) => {
      if (!pdfDoc) return;
      const start = Math.max(1, centerPage - 2);
      const end = Math.min(totalPages, centerPage + 8);

      for (let p = start; p <= end; p++) {
        if (!pageCacheRef.current.has(p)) {
          pdfDoc
            .getPage(p)
            .then((page: any) => {
              pageCacheRef.current.set(p, page);
            })
            .catch(() => {});
        }
      }

      for (const [key] of pageCacheRef.current.entries()) {
        if (key < centerPage - 5 || key > centerPage + 12) {
          pageCacheRef.current.delete(key);
        }
      }
    },
    [pdfDoc, totalPages]
  );

  const getSpreadPages = useCallback((page: number) => {
    if (!effectiveIsTwoPageSpread) return { left: null, right: page };
    const left = page % 2 === 0 ? page : page - 1;
    const right = left + 1;
    return { 
      left: left > 0 ? left : null, 
      right: right <= totalPages ? right : null 
    };
  }, [effectiveIsTwoPageSpread, totalPages]);

  useEffect(() => {
    if (!pdfDoc) return;

    let leftRenderTask: any = null;
    let rightRenderTask: any = null;

    async function renderPages() {
      const { left, right } = getSpreadPages(currentPage);

      // Render Left Canvas
      if (leftCanvasRef.current) {
        const leftCanvas = leftCanvasRef.current;
        const leftContext = leftCanvas.getContext("2d");
        
        if (left && leftContext) {
          try {
            const page = await getPdfPage(left);
            if (page) {
              const viewport = page.getViewport({ scale: zoom });
              
              // Double Buffering: Render to an off-screen canvas first
              const offscreenCanvas = document.createElement("canvas");
              offscreenCanvas.height = viewport.height;
              offscreenCanvas.width = viewport.width;
              const offscreenContext = offscreenCanvas.getContext("2d");
              
              if (offscreenContext) {
                leftRenderTask = page.render({
                  canvasContext: offscreenContext,
                  viewport: viewport,
                });
                await leftRenderTask.promise.catch(() => {});
                
                // Instantly swap the rendered image to the visible canvas to prevent flickering
                leftCanvas.height = viewport.height;
                leftCanvas.width = viewport.width;
                leftCanvas.style.display = "block";
                leftContext.drawImage(offscreenCanvas, 0, 0);
              }
            }
          } catch (e) {}
        } else {
          leftCanvas.style.display = "none";
        }
      }

      // Render Right Canvas
      if (rightCanvasRef.current) {
        const rightCanvas = rightCanvasRef.current;
        const rightContext = rightCanvas.getContext("2d");

        if (right && rightContext) {
          try {
            const page = await getPdfPage(right);
            if (page) {
              const viewport = page.getViewport({ scale: zoom });
              
              // Double Buffering: Render to an off-screen canvas first
              const offscreenCanvas = document.createElement("canvas");
              offscreenCanvas.height = viewport.height;
              offscreenCanvas.width = viewport.width;
              const offscreenContext = offscreenCanvas.getContext("2d");
              
              if (offscreenContext) {
                rightRenderTask = page.render({
                  canvasContext: offscreenContext,
                  viewport: viewport,
                });
                await rightRenderTask.promise.catch(() => {});
                
                // Instantly swap the rendered image to the visible canvas to prevent flickering
                rightCanvas.height = viewport.height;
                rightCanvas.width = viewport.width;
                rightCanvas.style.display = "block";
                rightContext.drawImage(offscreenCanvas, 0, 0);
              }
            }
          } catch (e) {}
        } else {
          rightCanvas.style.display = "none";
        }
      }

      setTimeout(() => {
        prefetchPagesWindow(currentPage);
      }, 50);
    }

    renderPages();

    return () => {
      if (leftRenderTask) leftRenderTask.cancel();
      if (rightRenderTask) rightRenderTask.cancel();
    };
  }, [pdfDoc, currentPage, zoom, getSpreadPages, getPdfPage, prefetchPagesWindow]);

  const handlePrev = useCallback(() => {
    if (effectiveIsTwoPageSpread) {
      const { left } = getSpreadPages(currentPage);
      if (left !== null && left > 1) {
        setCurrentPage(left - 1);
      } else {
        setCurrentPage(1);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }
    }
  }, [currentPage, effectiveIsTwoPageSpread, getSpreadPages]);

  const handleNext = useCallback(() => {
    if (!pdfDoc) return;
    if (effectiveIsTwoPageSpread) {
      const { right } = getSpreadPages(currentPage);
      if (right !== null && right < totalPages) {
        setCurrentPage(right + 1);
      }
    } else {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  }, [pdfDoc, currentPage, totalPages, effectiveIsTwoPageSpread, getSpreadPages]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore keypresses if the user is typing in the page jump input
      if (document.activeElement?.tagName === "INPUT") return;
      
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const getPinchDistance = (e: React.TouchEvent) => {
    if (e.touches.length < 2) return 0;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialPinchDist.current = getPinchDistance(e);
      basePinchScale.current = pinchScale;
    } else {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      initialPinchDist.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDist.current !== null) {
      // Prevent native scroll/zoom while pinching
      if (e.cancelable) e.preventDefault(); 
      const currentDist = getPinchDistance(e);
      const scaleDelta = currentDist / initialPinchDist.current;
      const newScale = Math.min(Math.max(1, basePinchScale.current * scaleDelta), 4);
      setPinchScale(newScale);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (initialPinchDist.current !== null) {
      initialPinchDist.current = null;
      return; // Handled pinch, don't swipe or tap
    }

    if (!touchStartX.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    
    // Tap detection (very small movement)
    if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
      setIsToolbarVisible((v) => !v);
      return;
    }

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -40) handleNext();
      else if (deltaX > 40) handlePrev();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    mouseDownX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const deltaX = e.clientX - mouseDownX.current;
    
    // Mouse click (Tap) detection
    if (Math.abs(deltaX) < 10) {
      setIsToolbarVisible((v) => !v);
      return;
    }

    if (Math.abs(deltaX) > 50) {
      if (deltaX < -50) handleNext();
      else if (deltaX > 50) handlePrev();
    }
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.6));

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
        setIsToolbarVisible(false); // Auto-hide toolbar in fullscreen
        
        // Attempt to lock screen to landscape on Android
        if (screen.orientation && (screen.orientation as any).lock) {
          try {
            await (screen.orientation as any).lock("landscape");
          } catch (e) {
            console.warn("Screen orientation lock failed or not supported.", e);
          }
        }
      } catch (e) {
        console.error("Fullscreen failed", e);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
        setIsToolbarVisible(true);
        setPinchScale(1);
      } catch (e) {}
    }
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "650px",
        height: isFullscreen ? "100vh" : "auto",
        background: "var(--primary, #0c0f17)",
        borderRadius: isFullscreen ? "0" : "20px",
        border: isFullscreen ? "none" : "1px solid rgba(200, 169, 106, 0.2)",
        overflow: "hidden",
        position: "relative",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "16px 24px",
          background: "rgba(12, 15, 23, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 20,
          transform: isToolbarVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <h2
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--foreground, #ffffff)",
            margin: 0,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "300px",
          }}
        >
          {title}
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1 || loading}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: currentPage <= 1 ? "not-allowed" : "pointer",
              opacity: currentPage <= 1 ? 0.4 : 1,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <input
              type="number"
              min={1}
              max={totalPages}
              value={jumpPage || currentPage}
              onChange={(e) => setJumpPage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const p = parseInt(jumpPage);
                  if (p >= 1 && p <= totalPages) {
                    setCurrentPage(p);
                  }
                  setJumpPage("");
                }
              }}
              onBlur={() => {
                const p = parseInt(jumpPage);
                if (p >= 1 && p <= totalPages) {
                  setCurrentPage(p);
                }
                setJumpPage("");
              }}
              style={{
                width: "60px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--accent, #c8a96a)",
                borderRadius: "6px",
                padding: "6px 4px",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "0.85rem",
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                color: "var(--accent, #c8a96a)",
                fontWeight: 700,
                padding: "0 4px",
              }}
            >
              / {totalPages > 0 ? totalPages : "-"}
            </span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages || loading}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: currentPage >= totalPages ? "not-allowed" : "pointer",
              opacity: currentPage >= totalPages ? 0.4 : 1,
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {!isFullscreen && (
            <>
              <button
                onClick={handleZoomOut}
                disabled={loading}
                title="Zoom Out"
                style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer" }}
              >
                <ZoomOut size={16} />
              </button>
              <span style={{ fontSize: "0.8rem", color: "var(--muted, #888)" }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={loading}
                title="Zoom In"
                style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer" }}
              >
                <ZoomIn size={16} />
              </button>
            </>
          )}
          
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            style={{ padding: "8px", borderRadius: "8px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "white", cursor: "pointer", marginLeft: "8px" }}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: isFullscreen ? "0" : "80px 16px 32px 16px", // adjust padding for absolute toolbar
          overflow: "hidden", // We use CSS transform for zoom now
          touchAction: "none", // Prevent native scrolling to allow pinch zoom
          cursor: "grab",
        }}
      >
        {loading && (
          <div style={{ textAlign: "center", color: "var(--accent, #c8a96a)" }}>
            <div
              style={{
                width: 40,
                height: 40,
                border: "3px solid rgba(200, 169, 106, 0.2)",
                borderTopColor: "var(--accent, #c8a96a)",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 16px",
              }}
            />
            <span>Loading PDF...</span>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", color: "#ff6b6b", padding: "24px" }}>
            <AlertCircle size={32} style={{ marginBottom: "12px" }} />
            <p>{error}</p>
          </div>
        )}

        {/* Canvases Wrapper with Pinch Zoom Scale */}
        <div style={{
          display: (loading || error) ? "none" : "flex",
          boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          borderRadius: "8px",
          overflow: "hidden",
          height: isFullscreen ? "100%" : "auto", // Vertical fit in fullscreen
          transform: `scale(${pinchScale})`,
          transformOrigin: "center center",
          transition: initialPinchDist.current ? "none" : "transform 0.15s ease-out",
        }}>
          {/* Left Canvas */}
          <canvas
            ref={leftCanvasRef}
            style={{
              display: "none",
              maxWidth: effectiveIsTwoPageSpread ? "50%" : "100%",
              height: isFullscreen ? "100%" : "auto", // Vertical fit
              objectFit: "contain",
            }}
          />

          {/* Right Canvas / Single Canvas */}
          <canvas
            ref={rightCanvasRef}
            style={{
              display: "none",
              maxWidth: effectiveIsTwoPageSpread ? "50%" : "100%",
              height: isFullscreen ? "100%" : "auto", // Vertical fit
              objectFit: "contain",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
