import React, { useEffect, useRef, useState } from 'react';
import { Download, ExternalLink, ZoomIn, ZoomOut, RotateCcw, Loader2, FileText } from 'lucide-react';

interface OriginalPdfFirstPageProps {
  pdfUrl: string;
  title: string;
}

declare global {
  interface Window {
    pdfjsLib?: any;
  }
}

export const OriginalPdfFirstPage: React.FC<OriginalPdfFirstPageProps> = ({ pdfUrl, title }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [scale, setScale] = useState<number>(1.0);
  const [useIframeFallback, setUseIframeFallback] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    setError(null);
    setUseIframeFallback(false);

    const renderPdfFirstPage = async () => {
      // Check if pdfjsLib is loaded
      if (!window.pdfjsLib) {
        // Fallback to iframe if pdfjsLib is not available
        setUseIframeFallback(true);
        setLoading(false);
        return;
      }

      try {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;
        if (isCancelled) return;

        // Fetch page 1 (the first page requested by the user)
        const page = await pdf.getPage(1);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Determine container width for responsive fit
        const containerWidth = containerRef.current?.clientWidth || 800;
        const unscaledViewport = page.getViewport({ scale: 1 });
        
        // Target display scale
        const targetScale = ((containerWidth - 32) / unscaledViewport.width) * scale;
        const pixelRatio = Math.max(window.devicePixelRatio || 1, 2); // 2x for sharp retina rendering
        
        const viewport = page.getViewport({ scale: targetScale * pixelRatio });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = `${viewport.width / pixelRatio}px`;
        canvas.style.height = `${viewport.height / pixelRatio}px`;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (!isCancelled) {
          setLoading(false);
        }
      } catch (err: any) {
        console.warn('PDF.js render failed, falling back to iframe', err);
        if (!isCancelled) {
          setUseIframeFallback(true);
          setLoading(false);
        }
      }
    };

    renderPdfFirstPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl, scale]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden" ref={containerRef}>
      
      {/* Top Action Bar */}
      <div className="bg-slate-900 text-white px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileText className="w-4 h-4 text-amber-400" />
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            {title} (Original Document - Page 1)
          </span>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-2">
          {!useIframeFallback && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700 text-slate-300 mr-2">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.7, s - 0.15))}
                className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-slate-400">
                {Math.round(scale * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(2.0, s + 0.15))}
                className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setScale(1.0)}
                className="p-1 hover:text-white hover:bg-slate-700 rounded transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            <span>Open in Full Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={pdfUrl}
            download
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Original PDF</span>
          </a>
        </div>
      </div>

      {/* Document View Area */}
      <div className="bg-slate-100 p-3 sm:p-8 flex justify-center items-center min-h-[600px] overflow-auto">
        {loading && (
          <div className="flex flex-col items-center gap-3 text-slate-500 py-16">
            <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            <p className="text-xs font-medium">Loading original certificate page 1...</p>
          </div>
        )}

        {useIframeFallback ? (
          <div className="w-full h-[850px] sm:h-[950px] bg-white rounded-xl shadow-md overflow-hidden border border-slate-200">
            <iframe
              src={`${pdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0`}
              title={title}
              className="w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg border border-slate-300/80 overflow-hidden transition-transform duration-200">
            <canvas ref={canvasRef} className="block max-w-full h-auto mx-auto" />
          </div>
        )}
      </div>

      {/* Clean Bottom Bar */}
      <div className="bg-white px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Government of India & Maharashtra State Official Certificate</span>
        <a
          href={pdfUrl}
          download
          className="text-amber-600 hover:text-amber-700 font-bold inline-flex items-center gap-1"
        >
          Download Certified PDF <Download className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};
