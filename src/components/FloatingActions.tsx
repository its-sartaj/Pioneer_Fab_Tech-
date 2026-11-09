import React from 'react';
import { Phone, ArrowUp } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.742.949 3.71 1.449 5.71 1.45h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
  </svg>
);

interface FloatingActionsProps {
  showScrollTop: boolean;
  isAtBottom: boolean;
  isMobileMenuOpen: boolean;
  onScrollToTop: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  showScrollTop,
  isAtBottom,
  isMobileMenuOpen,
  onScrollToTop,
}) => {
  return (
    <div
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 sm:gap-3 transition-all duration-300 ${
        isAtBottom || isMobileMenuOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'
      }`}
      role="region"
      aria-label="Quick contact actions"
    >
      {/* 1. Scroll To Top Button */}
      {showScrollTop && (
        <div className="relative group">
          <button
            onClick={onScrollToTop}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md text-slate-700 shadow-lg hover:shadow-xl border border-slate-200/90 flex items-center justify-center hover:bg-slate-50 hover:text-slate-950 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Desktop Tooltip */}
          <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:-translate-y-1 z-50">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/95 backdrop-blur-md text-white text-[11px] font-medium whitespace-nowrap shadow-lg border border-white/10">
              Back to Top
            </span>
            <div className="w-1.5 h-1.5 bg-slate-900 rotate-45 -mt-1 border-r border-b border-white/10" />
          </div>
        </div>
      )}

      {/* 2. Professional Direct Call Button */}
      <div className="relative group">
        <a
          href={`tel:${COMPANY_INFO.phoneRaw}`}
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#1E40AF] via-[#2563EB] to-[#3B82F6] text-white shadow-[0_8px_20px_-4px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_28px_-4px_rgba(37,99,235,0.65)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/20"
          title="Direct Call"
          aria-label={`Call Pioneer Fab Tech at ${COMPANY_INFO.phoneDisplay}`}
        >
          <Phone className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white group-hover:rotate-12 transition-transform duration-200" />
        </a>

        {/* Desktop Tooltip */}
        <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:-translate-y-1 z-50">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-blue-400" />
            <span>Call +91 90295 55233</span>
          </div>
          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-white/10" />
        </div>
      </div>

      {/* 3. Professional Official WhatsApp Button */}
      <div className="relative group">
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2BE271] text-white shadow-[0_8px_20px_-4px_rgba(37,211,102,0.5)] hover:shadow-[0_12px_28px_-4px_rgba(37,211,102,0.7)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-white/25"
          title="Chat on WhatsApp"
          aria-label="Chat with Pioneer Fab Tech on WhatsApp"
        >
          <WhatsAppIcon className="w-6 h-6 sm:w-6.5 sm:h-6.5 text-white fill-white group-hover:scale-105 transition-transform duration-200" />

          {/* Active Online Pulse Indicator */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white shadow-xs"></span>
          </span>
        </a>

        {/* Desktop Tooltip */}
        <div className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:-translate-y-1 z-50">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900/95 backdrop-blur-md text-white text-xs font-semibold whitespace-nowrap shadow-xl border border-white/10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
            <span>Chat on WhatsApp</span>
          </div>
          <div className="w-2 h-2 bg-slate-900 rotate-45 -mt-1 border-r border-b border-white/10" />
        </div>
      </div>
    </div>
  );
};