import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Download, ExternalLink, X, Maximize2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { PageId } from '../components/Navbar';
import { loadPdfJs } from '../utils/loadPdfJs';
import { OriginalPdfFirstPage } from '../components/OriginalPdfFirstPage';

interface CertificateItem {
  id: string;
  badgeLabel: string;
  title: string;
  pdfUrl: string;
  previewImage: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: 'gst',
    badgeLabel: 'GST CERTIFICATE',
    title: 'Government of India - GST Registration Certificate (Form GST REG-06)',
    pdfUrl: '/assets/aistudio/GST_Certificate_e62e8b0e.pdf',
    previewImage: '/assets/images/gst_cert_preview_1793876909399.jpg',
  },
  {
    id: 'udyam',
    badgeLabel: 'UDYAM CERTIFICATE',
    title: 'Ministry of MSME - Udyam Registration Certificate',
    pdfUrl: '/assets/aistudio/Print___Udyam_Registration_Certificate_Updated_42ee8545.pdf',
    previewImage: '/assets/images/udyam_cert_preview_1793876923612.jpg',
  },
  {
    id: 'ptec',
    badgeLabel: 'PTEC CERTIFICATE',
    title: 'Maharashtra State Tax - Profession Tax Certificate (Form II-A)',
    pdfUrl: '/assets/aistudio/PTEC_Certificate_e18b408a.pdf',
    previewImage: '/assets/images/ptec_cert_preview_1793876936574.jpg',
  },
];

// Single Certificate Canvas Renderer Component
const CertificateCanvas: React.FC<{ pdfUrl: string; previewImage: string; title: string }> = ({
  pdfUrl,
  previewImage,
  title,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const renderPage = async () => {
      try {
        const pdfjsLib = await loadPdfJs();
        if (isCancelled || !pdfjsLib) return;

        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (isCancelled) return;

        const page = await pdf.getPage(1);
        if (isCancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        // Render at up to 2x Retina DPR without exhausting mobile canvas memory
        const unscaledViewport = page.getViewport({ scale: 1 });
        const scale = 380 / unscaledViewport.width;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = page.getViewport({ scale: scale * dpr });

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = '100%';
        canvas.style.height = 'auto';

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        if (!isCancelled) {
          setRendered(true);
        }
      } catch (e) {
        console.warn('Canvas render fallback to previewImage', e);
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  return (
    <div className="relative w-full aspect-[1/1.414] bg-white overflow-hidden flex items-center justify-center">
      {/* If canvas rendered, display crisp vector canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full object-contain ${rendered ? 'block' : 'hidden'}`}
      />
      {/* Fallback image while canvas renders */}
      {!rendered && (
        <img
          src={previewImage}
          alt={title}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};

export interface CertificatesPageProps {
  onNavigate?: (page: PageId) => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ onNavigate }) => {
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Reset zoom & page when opening a different certificate
  const openCertificate = (cert: CertificateItem) => {
    setZoom(1);
    setPageNumber(1);
    setSelectedCert(cert);
  };

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedCert) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCert]);

  // Lock background scroll & compensate desktop scrollbar width cleanly while modal is open
  useEffect(() => {
    if (!selectedCert) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      const computedPaddingRight = parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
    };
  }, [selectedCert]);

  const certModal = selectedCert ? (
    <div
      className="fixed inset-0 w-screen h-[100dvh] z-[9999] flex flex-col bg-slate-950/92 md:backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedCert.badgeLabel} full view`}
    >
      {/* Unified Compact Header Bar with Zoom, Download, Open PDF & Close */}
      <div className="bg-[#d95800] text-white px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shrink-0 shadow-lg z-10">
        <span className="font-bold text-xs sm:text-sm tracking-wide truncate">
          {selectedCert.badgeLabel}
        </span>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Compact Zoom Controls */}
          <div className="inline-flex items-center gap-0.5 bg-black/20 rounded-md p-0.5 border border-white/15">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
              className="p-1.5 hover:bg-white/15 rounded text-white transition-colors cursor-pointer"
              title="Zoom Out"
              aria-label="Zoom out certificate"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="px-1.5 py-0.5 text-[11px] font-mono hover:bg-white/15 rounded text-white transition-colors cursor-pointer"
              title="Fit Full Certificate"
            >
              {zoom === 1 ? 'Full' : `${Math.round(zoom * 100)}%`}
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.25, +(z + 0.25).toFixed(2)))}
              className="p-1.5 hover:bg-white/15 rounded text-white transition-colors cursor-pointer"
              title="Zoom In"
              aria-label="Zoom in certificate"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom !== 1 && (
              <button
                type="button"
                onClick={() => setZoom(1)}
                className="p-1.5 hover:bg-white/15 rounded text-white transition-colors cursor-pointer"
                title="Reset Fit"
                aria-label="Reset certificate fit"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <a
            href={selectedCert.pdfUrl}
            download
            className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 bg-white text-[#c95100] font-bold text-xs rounded transition-colors hover:bg-slate-100"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Download</span>
          </a>
          <a
            href={selectedCert.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 bg-black/25 hover:bg-black/35 text-white font-semibold text-xs rounded transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open PDF</span>
          </a>
          <button
            type="button"
            onClick={() => setSelectedCert(null)}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/25 hover:bg-black/45 border border-white/25 text-white flex items-center justify-center transition-colors cursor-pointer ml-0.5"
            title="Close (Esc)"
            aria-label="Close certificate preview"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Full-View Certificate Canvas Stage (Fits entire certificate from top to bottom) */}
      <OriginalPdfFirstPage
        pdfUrl={selectedCert.pdfUrl}
        title={selectedCert.title}
        fallbackImage={selectedCert.previewImage}
        zoom={zoom}
        pageNumber={pageNumber}
        onPageChange={setPageNumber}
        onBackdropClick={() => setSelectedCert(null)}
      />
    </div>
  ) : null;

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Top Industrial Banner matching image_7197bf9a.png */}
      <div className="relative h-44 sm:h-52 lg:h-56 w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center text-center px-4">
        {/* Background Image with dark industrial workshop */}
        <img
          src="/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.03_PM_2f9ff5e2.jpeg"
          alt="Certificate Header"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
          decoding="async"
        />
        {/* Blue/black gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        {/* Content */}
        <div className="relative z-10 space-y-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Certificate
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate?.('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">&gt;</span>
            <span className="text-white font-bold select-none">Certificate</span>
          </div>
        </div>
      </div>

      {/* 2. Main Section */}
      <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading in Dark Orange */}
        <div className="text-center mb-10 sm:mb-12 reveal-word">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#d95800] tracking-wide inline-block">
            Our Certificate
          </h2>
        </div>

        {/* 3. Certificate Grid matching the exact reference design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 justify-items-center">
          {CERTIFICATES.map((cert, idx) => {
            const delayClasses = ['', 'delay-75', 'delay-150'];
            return (
              <div
                key={cert.id}
                onClick={() => openCertificate(cert)}
                className={`flex flex-col items-center w-full max-w-[340px] group cursor-pointer reveal-on-scroll ${delayClasses[idx] || ''}`}
              >
              {/* Rectangular Black Frame */}
              <div className="w-full bg-white border-2 border-black p-2 sm:p-2.5 shadow-md hover:shadow-2xl transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 relative transform-gpu">
                <CertificateCanvas
                  pdfUrl={cert.pdfUrl}
                  previewImage={cert.previewImage}
                  title={cert.title}
                />

                {/* Subtle Hover Overlay with Inspect Icon */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-full bg-white/95 text-slate-900 shadow-lg">
                    <Maximize2 className="w-5 h-5 text-[#d95800]" />
                  </div>
                </div>
              </div>

              {/* Dark Orange Badge Button underneath frame */}
              <div className="mt-3.5 w-full flex justify-center">
                <div className="bg-[#d95800] group-hover:bg-[#ea6800] text-white text-xs sm:text-sm font-bold py-1.5 px-6 rounded-none tracking-wider text-center transition-colors shadow-xs">
                  {cert.badgeLabel}
                </div>
              </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. Fullscreen Modal Viewer portaled directly to document.body */}
      {typeof document !== 'undefined' && certModal
        ? createPortal(certModal, document.body)
        : certModal}

    </div>
  );
};
