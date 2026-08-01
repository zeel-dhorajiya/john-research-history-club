"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize, Minimize, AlertCircle } from "lucide-react";

interface PdfFlipbookProps {
  pdfUrl: string;
  title: string;
}

export default function PdfFlipbook({ pdfUrl, title }: PdfFlipbookProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1.2);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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
          disableStream: false,
          rangeChunkSize: 65536 * 2,
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
    };
  }, [pdfUrl]);

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let renderTask: any = null;

    async function renderPage() {
      try {
        const page = await pdfDoc.getPage(currentPage);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const viewport = page.getViewport({ scale: zoom });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== "RenderingCancelledException") {
          console.error("Page render error:", err);
        }
      }
    }

    renderPage();

    return () => {
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, currentPage, zoom]);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (pdfDoc && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.6));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
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
        background: "var(--primary, #0c0f17)",
        borderRadius: "20px",
        border: "1px solid rgba(200, 169, 106, 0.2)",
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
          position: "sticky",
          top: 0,
          zIndex: 20,
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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
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

          <span
            style={{
              fontSize: "0.85rem",
              color: "var(--accent, #c8a96a)",
              fontWeight: 700,
              padding: "0 8px",
            }}
          >
            {totalPages > 0 ? `${currentPage} / ${totalPages}` : "-"}
          </span>

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
          <button
            onClick={handleZoomOut}
            disabled={loading}
            title="Zoom Out"
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
            }}
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
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
            }}
          >
            <ZoomIn size={16} />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            style={{
              padding: "8px",
              borderRadius: "8px",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "white",
              cursor: "pointer",
              marginLeft: "8px",
            }}
          >
            {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 16px",
          overflow: "auto",
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
            <span>Loading pages onto Canvas...</span>
          </div>
        )}

        {error && (
          <div style={{ textAlign: "center", color: "#ff6b6b", padding: "24px" }}>
            <AlertCircle size={32} style={{ marginBottom: "12px" }} />
            <p>{error}</p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          style={{
            display: loading || error ? "none" : "block",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            borderRadius: "8px",
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
