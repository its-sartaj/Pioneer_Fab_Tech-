import React, { useState, useEffect, useRef } from 'react';

export interface ClientItem {
  id: string;
  name: string;
  renderLogo: (isActive?: boolean) => React.ReactNode;
}

export const CLIENTS_LIST: ClientItem[] = [
  // 1. Berlly Stone Pvt Ltd
  {
    id: 'berlly-stone',
    name: 'Berlly Stone Pvt Ltd',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Diamond Cut Stone Icon */}
        <svg viewBox="0 0 54 54" className={`w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'scale-105' : ''}`} fill="none">
          <polygon points="27,4 48,16 48,38 27,50 6,38 6,16" stroke={isActive ? '#ffffff' : '#0f766e'} strokeWidth="3" fill={isActive ? 'rgba(255,255,255,0.2)' : '#f0fdfa'} className="transition-colors duration-300 group-hover:stroke-white group-hover:fill-white/20" />
          <polygon points="27,4 27,50" stroke={isActive ? 'rgba(255,255,255,0.8)' : '#0f766e'} strokeWidth="2" strokeDasharray="3 2" className="transition-colors duration-300 group-hover:stroke-white/80" />
          <polyline points="6,16 27,27 48,16" stroke={isActive ? '#ffffff' : '#0d9488'} strokeWidth="2.2" className="transition-colors duration-300 group-hover:stroke-white" />
          <polyline points="6,38 27,27 48,38" stroke={isActive ? '#ffffff' : '#0d9488'} strokeWidth="2.2" className="transition-colors duration-300 group-hover:stroke-white" />
        </svg>
        <div className="text-left">
          <span className={`block text-xl sm:text-2xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-slate-900'}`}>
            BERLLY
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-widest mt-1 uppercase transition-colors duration-300 group-hover:text-amber-100 ${isActive ? 'text-amber-100' : 'text-[#0d9488]'}`}>
            STONE PVT LTD
          </span>
        </div>
      </div>
    ),
  },
  // 2. Descone Turnkey Solutions
  {
    id: 'descone',
    name: 'Descone Turnkey Solutions',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Turnkey 3D Isometric Cube Icon */}
        <svg viewBox="0 0 54 54" className={`w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'scale-105' : ''}`} fill="none">
          <path d="M27 4 L48 16 L48 38 L27 50 L6 38 L6 16 Z" fill={isActive ? 'rgba(255,255,255,0.2)' : '#fff7ed'} stroke={isActive ? '#ffffff' : '#ea580c'} strokeWidth="3" className="transition-colors duration-300 group-hover:fill-white/20 group-hover:stroke-white" />
          <path d="M27 4 L27 27 L48 16" stroke={isActive ? '#ffffff' : '#ea580c'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
          <path d="M27 27 L6 16" stroke={isActive ? '#ffffff' : '#ea580c'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
          <path d="M27 27 L27 50" stroke={isActive ? '#ffffff' : '#ea580c'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
          <circle cx="27" cy="27" r="4" fill={isActive ? '#fcd34d' : '#ea580c'} className="transition-colors duration-300 group-hover:fill-amber-300" />
        </svg>
        <div className="text-left">
          <span className={`block text-xl sm:text-2xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-slate-900'}`}>
            DESCONE
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-wide mt-1 uppercase transition-colors duration-300 group-hover:text-amber-100 ${isActive ? 'text-amber-100' : 'text-[#ea580c]'}`}>
            TURNKEY SOLUTIONS
          </span>
        </div>
      </div>
    ),
  },
  // 3. SND Interiors
  {
    id: 'snd-interiors',
    name: 'SND Interiors',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Monogram Crest */}
        <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:bg-white group-hover:border-white ${isActive ? 'bg-white border-white' : 'bg-[#1e1b4b] border-indigo-500/80'}`}>
          <span className={`font-black text-lg tracking-wider transition-colors duration-300 group-hover:text-[#9a3412] ${isActive ? 'text-[#9a3412]' : 'text-amber-400'}`}>SND</span>
        </div>
        <div className="text-left">
          <span className={`block text-xl sm:text-2xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-[#1e1b4b]'}`}>
            SND
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-widest mt-1 uppercase transition-colors duration-300 group-hover:text-amber-100 ${isActive ? 'text-amber-100' : 'text-[#d97706]'}`}>
            INTERIORS
          </span>
        </div>
      </div>
    ),
  },
  // 4. Solas Marine Service Pvt Ltd
  {
    id: 'solas-marine',
    name: 'Solas Marine Service Pvt ltd',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Maritime Helm Icon */}
        <svg viewBox="0 0 54 54" className={`w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'scale-105' : ''}`} fill="none">
          <circle cx="27" cy="27" r="20" stroke={isActive ? '#ffffff' : '#0284c7'} strokeWidth="3" fill={isActive ? 'rgba(255,255,255,0.2)' : '#f0f9ff'} className="transition-colors duration-300 group-hover:stroke-white group-hover:fill-white/20" />
          <circle cx="27" cy="27" r="9" stroke={isActive ? '#ffffff' : '#0369a1'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
          <path d="M27 4v6m0 34v6M4 27h6m34 0h6" stroke={isActive ? '#ffffff' : '#0284c7'} strokeWidth="2.5" strokeLinecap="round" className="transition-colors duration-300 group-hover:stroke-white" />
          <circle cx="27" cy="27" r="3.5" fill={isActive ? '#ffffff' : '#0284c7'} className="transition-colors duration-300 group-hover:fill-white" />
        </svg>
        <div className="text-left">
          <span className={`block text-xl sm:text-2xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-[#0c4a6e]'}`}>
            SOLAS MARINE
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-wider mt-1 uppercase transition-colors duration-300 group-hover:text-sky-100 ${isActive ? 'text-sky-100' : 'text-[#0284c7]'}`}>
            SERVICE PVT LTD
          </span>
        </div>
      </div>
    ),
  },
  // 5. SS interiors
  {
    id: 'ss-interiors',
    name: 'SS interiors',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Double S Emblem */}
        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:bg-white group-hover:border-white ${isActive ? 'bg-white border-white' : 'bg-slate-900 border-slate-600'}`}>
          <span className={`font-black text-xl tracking-tighter transition-colors duration-300 group-hover:text-[#c2410c] ${isActive ? 'text-[#c2410c]' : 'text-rose-500'}`}>SS</span>
        </div>
        <div className="text-left">
          <span className={`block text-2xl sm:text-3xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-slate-900'}`}>
            SS
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-widest mt-1 uppercase transition-colors duration-300 group-hover:text-rose-100 ${isActive ? 'text-rose-100' : 'text-rose-600'}`}>
            INTERIORS
          </span>
        </div>
      </div>
    ),
  },
  // 6. Nexus Turnkey Interior Solution
  {
    id: 'nexus-turnkey',
    name: 'Nexus Turnkey Interior Solution',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Hexagonal Node */}
        <svg viewBox="0 0 54 54" className={`w-12 h-12 shrink-0 transition-transform duration-300 group-hover:scale-105 ${isActive ? 'scale-105' : ''}`} fill="none">
          <polygon points="27,5 48,16 48,38 27,49 6,38 6,16" stroke={isActive ? '#ffffff' : '#4f46e5'} strokeWidth="3" fill={isActive ? 'rgba(255,255,255,0.2)' : '#eef2ff'} className="transition-colors duration-300 group-hover:stroke-white group-hover:fill-white/20" />
          <circle cx="27" cy="27" r="5" fill={isActive ? '#fcd34d' : '#f59e0b'} className="transition-colors duration-300 group-hover:fill-amber-300" />
          <line x1="27" y1="5" x2="27" y2="22" stroke={isActive ? '#ffffff' : '#4f46e5'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
          <line x1="48" y1="38" x2="31" y2="29" stroke={isActive ? '#ffffff' : '#4f46e5'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
          <line x1="6" y1="38" x2="23" y2="29" stroke={isActive ? '#ffffff' : '#4f46e5'} strokeWidth="2.5" className="transition-colors duration-300 group-hover:stroke-white" />
        </svg>
        <div className="text-left">
          <span className={`block text-xl sm:text-2xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-[#1e1b4b]'}`}>
            NEXUS
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-tight mt-1 uppercase transition-colors duration-300 group-hover:text-indigo-100 ${isActive ? 'text-indigo-100' : 'text-[#4f46e5]'}`}>
            TURNKEY INTERIOR SOLUTION
          </span>
        </div>
      </div>
    ),
  },
  // 7. K.p Interior
  {
    id: 'kp-interior',
    name: 'K.p Interior',
    renderLogo: (isActive = false) => (
      <div className="flex items-center justify-center gap-3.5 w-full">
        {/* Drafting Compass Box */}
        <div className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center shrink-0 shadow-xs transition-all duration-300 group-hover:bg-white group-hover:border-white ${isActive ? 'bg-white border-white' : 'bg-amber-50 border-amber-600'}`}>
          <span className={`font-black text-xl tracking-wider transition-colors duration-300 group-hover:text-[#c2410c] ${isActive ? 'text-[#c2410c]' : 'text-amber-700'}`}>KP</span>
        </div>
        <div className="text-left">
          <span className={`block text-xl sm:text-2xl font-black tracking-wider leading-none font-sans transition-colors duration-300 group-hover:text-white ${isActive ? 'text-white' : 'text-stone-900'}`}>
            K.P
          </span>
          <span className={`block text-xs sm:text-sm font-extrabold tracking-widest mt-1 uppercase transition-colors duration-300 group-hover:text-amber-100 ${isActive ? 'text-amber-100' : 'text-[#b45309]'}`}>
            INTERIOR
          </span>
        </div>
      </div>
    ),
  },
];

export const OurClientsSlider: React.FC = () => {
  const [offsetIndex, setOffsetIndex] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [touchedIdx, setTouchedIdx] = useState<number | null>(null);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef<number>(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);
  const touchResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cardWidth, setCardWidth] = useState(280);
  const gap = 24;

  const total = CLIENTS_LIST.length; // 7
  // Double the list for seamless infinite loop without bloated DOM
  const slidingTrack = [...CLIENTS_LIST, ...CLIENTS_LIST];

  // Observe container width changes only (ignores mobile address bar height jitter)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const calculateCardSize = () => {
      const containerWidth = el.clientWidth;
      if (Math.abs(containerWidth - lastWidthRef.current) < 2) return;
      lastWidthRef.current = containerWidth;

      if (containerWidth >= 1024) {
        setCardWidth((containerWidth - gap * 3) / 4);
      } else if (containerWidth >= 640) {
        setCardWidth((containerWidth - gap) / 2);
      } else {
        setCardWidth(containerWidth);
      }
    };

    calculateCardSize();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(calculateCardSize);
      ro.observe(el);
      return () => ro.disconnect();
    }

    (window as Window).addEventListener('resize', calculateCardSize);
    return () => (window as Window).removeEventListener('resize', calculateCardSize);
  }, []);

  // Pause slider timer when scrolled out of view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? true);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Slide smoothly every 2.8s when visible & idle
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || !isVisible || prefersReduced) return;

    const timer = setInterval(() => {
      if (document.hidden) return;
      setIsTransitionEnabled(true);
      setOffsetIndex((prev) => (prev >= total ? 1 : prev + 1));
    }, 2800);

    return () => clearInterval(timer);
  }, [isPaused, isVisible, total]);

  // Seamless zero-jank wrap reset right after track transform finishes on clone index `total`
  const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'transform') return;
    if (offsetIndex >= total) {
      setIsTransitionEnabled(false);
      setOffsetIndex(0);
    }
  };

  useEffect(() => {
    return () => {
      if (touchResumeTimerRef.current) clearTimeout(touchResumeTimerRef.current);
    };
  }, []);

  // Live finger-tracking touch swipe on phones without blocking vertical scroll
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
    touchStartYRef.current = e.touches[0]?.clientY ?? null;
    isHorizontalSwipeRef.current = null;
    if (touchResumeTimerRef.current) clearTimeout(touchResumeTimerRef.current);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const x = e.touches[0]?.clientX ?? touchStartXRef.current;
    const y = e.touches[0]?.clientY ?? touchStartYRef.current;
    const dx = x - touchStartXRef.current;
    const dy = y - touchStartYRef.current;

    if (isHorizontalSwipeRef.current === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) {
      isHorizontalSwipeRef.current = Math.abs(dx) > Math.abs(dy);
    }

    if (isHorizontalSwipeRef.current) {
      setIsTransitionEnabled(false);
      setDragOffsetPx(Math.max(-cardWidth * 0.9, Math.min(cardWidth * 0.9, dx)));
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const deltaX = (e.changedTouches[0]?.clientX ?? touchStartXRef.current) - touchStartXRef.current;
      touchStartXRef.current = null;
      touchStartYRef.current = null;
      isHorizontalSwipeRef.current = null;

      setIsTransitionEnabled(true);
      setDragOffsetPx(0);

      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          setOffsetIndex((prev) => (prev >= total ? 1 : prev + 1));
        } else {
          setOffsetIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
        }
      }
    }
    if (touchResumeTimerRef.current) clearTimeout(touchResumeTimerRef.current);
    touchResumeTimerRef.current = setTimeout(() => setIsPaused(false), 2600);
  };

  const translateX = -(offsetIndex * (cardWidth + gap)) + dragOffsetPx;

  return (
    <section className="py-12 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching reference image */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#d95800] tracking-wide inline-block">
            Our Client
          </h2>
        </div>

        {/* Sliding Track Viewport */}
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden py-3 touch-pan-y"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`flex transform-gpu ${
              isTransitionEnabled ? 'transition-transform duration-[620ms] ease-[cubic-bezier(0.22,1,0.36,1)]' : ''
            }`}
            style={{
              gap: `${gap}px`,
              transform: `translate3d(${translateX}px, 0, 0)`,
            }}
          >
            {slidingTrack.map((client, idx) => {
              const isTouchFilled = touchedIdx === idx;
              return (
                <div
                  key={`${client.id}-${idx}`}
                  onClick={() => setTouchedIdx((prev) => (prev === idx ? null : idx))}
                  style={{ width: `${cardWidth}px` }}
                  className={`relative overflow-hidden shrink-0 bg-white rounded-2xl border p-6 sm:p-7 flex items-center justify-center min-h-[150px] sm:min-h-[175px] shadow-xs hover:shadow-xl hover:shadow-orange-950/20 transition-[transform,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:-translate-y-1.5 select-none cursor-pointer ${
                    isTouchFilled
                      ? 'is-touch-active border-[#c2410c] -translate-y-1'
                      : 'border-slate-700/80 hover:border-[#c2410c]'
                  }`}
                >
                  {/* Burnt Orange Animated Liquid Fill Layer */}
                  <div className="client-card-fill" />

                  {/* Content on top */}
                  <div className="relative z-10 w-full flex items-center justify-center group-hover:scale-103 transition-transform duration-300">
                    {client.renderLogo(isTouchFilled)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
