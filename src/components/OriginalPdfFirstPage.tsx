import React, { useEffect, useRef, useState } from 'react';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { loadPdfJs } from '../utils/loadPdfJs';

interface OriginalPdfFirstPageProps {
  pdfUrl: string;
  title: string;
  fallbackImage?: string;
  zoom?: number;
  onNumPagesLoaded?: (numPages: number) => void;
  pageNumber?: number;
  onPageChange?: (page: number) => void;
  onBackdropClick?: () => void;
}

/**
 * Renders a PDF certificate page fitted completely inside the available viewport
 * ("Full View") by default, with optional zoom & multi-page navigation.
 */
export const OriginalPdfFirstPage: React.FC<OriginalPdfFirstPageProps> = ({
  pdfUrl,
  title,
  fallbackImage,
  zoom = 1,
  onNumPagesLoaded,
  pageNumber = 1,
  onPageChange,
  onBackdropClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [useFallbackImage, setUseFallbackImage] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(1);
  const [stageSize, setStageSize] = useState<{ width: number; height: number }>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight - 64 : 700,
  });
  const [pageAspect, setPageAspect] = useState<{ width: number; height: number } | null>(null);

  // Measure actual stage dimensions cleanly so fitted certificate never clips
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateSize = () => {
      setStageSize({ width: el.clientWidth, height: el.clientHeight });
    };
    updateSize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(updateSize);
      ro.observe(el);
      return () => ro.disconnect();
    }

    (window as Window).addEventListener('resize', updateSize);
    return () => (window as Window).removeEventListener('resize', updateSize);
  }, []);

  // Load PDF & render the requested page at sharp retina resolution
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setUseFallbackImage(false);

    const renderPage = async () => {
      try {
        const pdfjsLib = await loadPdfJs();
        if (isCancelled || !pdfjsLib) {
          if (!isCancelled) {
            setUseFallbackImage(true);
            setLoading(false);
          }
          return;
        }

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (isCancelled) return;

        const total = pdf.numPages || 1;
        setNumPages(total);
        onNumPagesLoaded?.(total);

        const safePage = Math.min(Math.max(1, pageNumber), total);
        const page = await pdf.getPage(safePage);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const unscaledViewport = page.getViewport({ scale: 1 });
        setPageAspect({ width: unscaledViewport.width, height: unscaledViewport.height });

        // Render high-res backing buffer (crisp when fitting OR zooming up to 2.2x)
        const desiredPxWidth = Math.min(Math.max(1100, unscaledViewport.width * 2), 2000);
        const renderScale = desiredPxWidth / unscaledViewport.width;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: renderScale * dpr });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        if (!isCancelled) {
          setLoading(false);
        }
      } catch (err) {
        console.warn('PDF.js full-view render failed, using fallback preview', err);
        if (!isCancelled) {
          setUseFallbackImage(true);
          setLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl, pageNumber, onNumPagesLoaded]);

  // Compute CSS display dimensions so full page fits 100% inside stage at zoom === 1
  const padX = stageSize.width < 640 ? 16 : 40;
  const topPad = stageSize.height < 640 ? 16 : 24;
  const bottomPad = numPages > 1 ? 56 : topPad;
  const availW = Math.max(stageSize.width - padX, 200);
  const availH = Math.max(stageSize.height - topPad - bottomPad, 200);

  let displayWidth: number | undefined;
  let displayHeight: number | undefined;

  if (pageAspect) {
    const fitRatio = Math.min(availW / pageAspect.width, availH / pageAspect.height);
    displayWidth = Math.floor(pageAspect.width * fitRatio * zoom);
    displayHeight = Math.floor(pageAspect.height * fitRatio * zoom);
  }

  return (
    <div
      ref={stageRef}
      onClick={onBackdropClick}
      className={`relative flex-1 min-h-0 w-full h-full flex overflow-auto overscroll-contain px-2 sm:px-4 pt-2 sm:pt-3 ${
        numPages > 1 ? 'pb-14' : 'pb-2 sm:pb-4'
      }`}
    >
      {loading && !fallbackImage && (
        <div className="m-auto flex flex-col items-center gap-3 text-slate-300 py-10">
          <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
          <p className="text-xs font-medium">Loading full certificate view...</p>
        </div>
      )}

      {useFallbackImage ? (
        fallbackImage ? (
          <div
            onClick={(e) => e.stopPropagation()}
            className="m-auto bg-white rounded-lg shadow-2xl border border-white/15 overflow-hidden flex items-center justify-center"
            style={{
              maxWidth: zoom > 1 ? 'none' : `${availW}px`,
              maxHeight: zoom > 1 ? 'none' : `${availH}px`,
            }}
          >
            <img
              src={fallbackImage}
              alt={title}
              decoding="async"
              style={{
                maxWidth: zoom > 1 ? 'none' : `${availW}px`,
                maxHeight: zoom > 1 ? 'none' : `${availH}px`,
                width: zoom > 1 ? `${Math.floor(availW * zoom)}px` : 'auto',
                height: 'auto',
              }}
              className="object-contain block select-none"
            />
          </div>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="m-auto w-full max-w-4xl h-full bg-white rounded-lg shadow-2xl overflow-hidden"
          >
            <iframe
              src={`${pdfUrl}#page=${pageNumber}&view=Fit`}
              title={title}
              className="w-full h-full border-0"
            />
          </div>
        )
      ) : (
        <div
          onClick={(e) => e.stopPropagation()}
          className="m-auto relative bg-white rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/20 overflow-hidden shrink-0"
        >
          {/* Instant preview placeholder while PDF canvas renders */}
          {loading && fallbackImage && (
            <img
              src={fallbackImage}
              alt={title}
              decoding="async"
              style={{
                maxWidth: `${availW}px`,
                maxHeight: `${availH}px`,
                width: 'auto',
                height: 'auto',
              }}
              className="block object-contain select-none"
            />
          )}

          <canvas
            ref={canvasRef}
            style={
              displayWidth && displayHeight
                ? { width: `${displayWidth}px`, height: `${displayHeight}px` }
                : { maxWidth: `${availW}px`, maxHeight: `${availH}px`, width: 'auto', height: 'auto' }
            }
            className={`block select-none ${loading ? 'hidden' : 'block'}`}
          />

          {/* Compact Floating Multi-Page Switcher when PDF has 2+ pages */}
          {numPages > 1 && onPageChange && !loading && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000] inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold border border-white/20 shadow-xl">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={(e) => {
                  e.stopPropagation();
                  onPageChange(Math.max(1, pageNumber - 1));
                }}
                className="p-1 rounded-full hover:bg-white/15 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Previous certificate page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-1 font-mono">
                Page {pageNumber} / {numPages}
              </span>
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={(e) => {
                  e.stopPropagation();
                  onPageChange(Math.min(numPages, pageNumber + 1));
                }}
                className="p-1 rounded-full hover:bg-white/15 disabled:opacity-35 cursor-pointer disabled:cursor-not-allowed"
                aria-label="Next certificate page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
