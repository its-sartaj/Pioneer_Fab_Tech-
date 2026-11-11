import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageId } from '../components/Navbar';
import { useIsMobileView } from '../utils/useIsMobileView';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
}

export interface GalleryItem {
  id: string;
  src: string;
  direction: 'bottom' | 'left' | 'right';
}

// 61 Architectural & Industrial Fabrication Gallery Photos
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'gal-1', src: '/assets/gallery/work_01.jpeg', direction: 'bottom' },
  { id: 'gal-2', src: '/assets/gallery/work_02.jpeg', direction: 'right' },
  { id: 'gal-3', src: '/assets/gallery/work_03.jpeg', direction: 'left' },
  { id: 'gal-4', src: '/assets/gallery/work_04.jpeg', direction: 'left' },
  { id: 'gal-5', src: '/assets/gallery/work_05.jpeg', direction: 'bottom' },
  { id: 'gal-6', src: '/assets/gallery/work_06.jpeg', direction: 'right' },
  { id: 'gal-7', src: '/assets/gallery/work_07.jpeg', direction: 'right' },
  { id: 'gal-8', src: '/assets/gallery/work_08.jpeg', direction: 'bottom' },
  { id: 'gal-9', src: '/assets/gallery/work_09.jpeg', direction: 'left' },
  { id: 'gal-10', src: '/assets/gallery/work_10.jpeg', direction: 'bottom' },
  { id: 'gal-11', src: '/assets/gallery/work_11.jpeg', direction: 'left' },
  { id: 'gal-12', src: '/assets/gallery/work_12.jpeg', direction: 'right' },
  { id: 'gal-13', src: '/assets/gallery/work_13.jpeg', direction: 'bottom' },
  { id: 'gal-14', src: '/assets/gallery/work_14.jpeg', direction: 'left' },
  { id: 'gal-15', src: '/assets/gallery/work_15.jpeg', direction: 'right' },
  { id: 'gal-16', src: '/assets/gallery/work_16.jpeg', direction: 'bottom' },
  { id: 'gal-17', src: '/assets/gallery/work_17.jpeg', direction: 'right' },
  { id: 'gal-18', src: '/assets/gallery/work_18.jpeg', direction: 'left' },
  { id: 'gal-19', src: '/assets/gallery/work_19.jpeg', direction: 'bottom' },
  { id: 'gal-20', src: '/assets/gallery/work_20.jpeg', direction: 'right' },
  { id: 'gal-21', src: '/assets/gallery/work_21.jpeg', direction: 'left' },
  { id: 'gal-22', src: '/assets/gallery/work_22.jpeg', direction: 'left' },
  { id: 'gal-23', src: '/assets/gallery/work_23.jpeg', direction: 'bottom' },
  { id: 'gal-24', src: '/assets/gallery/work_24.jpeg', direction: 'right' },
  { id: 'gal-25', src: '/assets/gallery/work_25.jpeg', direction: 'left' },
  { id: 'gal-26', src: '/assets/gallery/work_26.jpeg', direction: 'bottom' },
  { id: 'gal-27', src: '/assets/gallery/work_27.jpeg', direction: 'right' },
  { id: 'gal-28', src: '/assets/gallery/work_28.jpeg', direction: 'left' },
  { id: 'gal-29', src: '/assets/gallery/work_29.jpeg', direction: 'bottom' },
  { id: 'gal-30', src: '/assets/gallery/work_30.jpeg', direction: 'right' },
  { id: 'gal-31', src: '/assets/gallery/work_31.jpeg', direction: 'left' },
  { id: 'gal-32', src: '/assets/gallery/work_32.jpeg', direction: 'bottom' },
  { id: 'gal-33', src: '/assets/gallery/work_33.jpeg', direction: 'right' },
  { id: 'gal-34', src: '/assets/gallery/work_34.jpeg', direction: 'left' },
  { id: 'gal-35', src: '/assets/gallery/work_35.jpeg', direction: 'bottom' },
  { id: 'gal-36', src: '/assets/gallery/work_36.jpeg', direction: 'right' },
  { id: 'gal-37', src: '/assets/gallery/work_37.jpeg', direction: 'left' },
  { id: 'gal-38', src: '/assets/gallery/work_38.jpeg', direction: 'bottom' },
  { id: 'gal-39', src: '/assets/gallery/work_39.jpeg', direction: 'right' },
  { id: 'gal-40', src: '/assets/gallery/work_40.jpeg', direction: 'left' },
  { id: 'gal-41', src: '/assets/gallery/work_41.jpeg', direction: 'bottom' },
  { id: 'gal-42', src: '/assets/gallery/work_42.jpeg', direction: 'right' },
  { id: 'gal-43', src: '/assets/gallery/work_43.jpeg', direction: 'left' },
  { id: 'gal-44', src: '/assets/gallery/work_44.jpeg', direction: 'bottom' },
  { id: 'gal-45', src: '/assets/gallery/work_45.jpeg', direction: 'right' },
  { id: 'gal-46', src: '/assets/gallery/work_46.jpeg', direction: 'left' },
  { id: 'gal-47', src: '/assets/gallery/work_47.jpeg', direction: 'bottom' },
  { id: 'gal-48', src: '/assets/gallery/work_48.jpeg', direction: 'right' },
  { id: 'gal-49', src: '/assets/gallery/work_49.jpeg', direction: 'left' },
  { id: 'gal-50', src: '/assets/gallery/work_50.jpeg', direction: 'bottom' },
  { id: 'gal-51', src: '/assets/gallery/work_51.jpeg', direction: 'right' },
  { id: 'gal-52', src: '/assets/gallery/work_52.jpeg', direction: 'left' },
  { id: 'gal-53', src: '/assets/gallery/work_53.jpeg', direction: 'bottom' },
  { id: 'gal-54', src: '/assets/gallery/work_54.jpeg', direction: 'right' },
  { id: 'gal-55', src: '/assets/gallery/work_55.jpeg', direction: 'left' },
  { id: 'gal-56', src: '/assets/gallery/work_56.jpeg', direction: 'bottom' },
  { id: 'gal-57', src: '/assets/gallery/work_57.jpeg', direction: 'right' },
  { id: 'gal-58', src: '/assets/gallery/work_58.jpeg', direction: 'left' },
  { id: 'gal-59', src: '/assets/gallery/work_59.jpeg', direction: 'bottom' },
  { id: 'gal-60', src: '/assets/gallery/work_60.jpeg', direction: 'right' },
  { id: 'gal-61', src: '/assets/gallery/work_61.jpeg', direction: 'left' },
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lightboxTouchStartXRef = useRef<number | null>(null);
  const isMobileView = useIsMobileView(768);

  // GSAP ScrollTrigger: crisp reveal everywhere, parallax only on fine-pointer desktop
  useEffect(() => {
    if (!containerRef.current || GALLERY_ITEMS.length === 0) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 768px) and (hover: hover)',
        isMobileOrTouch: '(max-width: 767px), (hover: none)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobileOrTouch: boolean };
        const cards = gsap.utils.toArray<HTMLElement>('.gallery-grid-card');
        if (cards.length === 0) return;

        cards.forEach((card, index) => {
          const direction = card.getAttribute('data-direction');
          const initialX = isDesktop ? (direction === 'left' ? -10 : direction === 'right' ? 10 : 0) : 0;
          const initialY = isDesktop ? (initialX === 0 ? 12 : 6) : 14;

          gsap.fromTo(
            card,
            {
              opacity: 0,
              scale: isDesktop ? 0.985 : 0.99,
              x: initialX,
              y: initialY,
            },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              duration: isDesktop ? 0.34 : 0.28,
              ease: 'power2.out',
              clearProps: 'transform,willChange',
              scrollTrigger: {
                trigger: card,
                start: 'top 96%',
                toggleActions: 'play none none none',
              },
              delay: isDesktop ? (index % 3) * 0.03 : (index % 2) * 0.02,
            }
          );

          // Parallax lives on .gallery-parallax-wrap so it never collides with CSS hover scale on <img>
          if (isDesktop) {
            const parallaxWrap = card.querySelector<HTMLElement>('.gallery-parallax-wrap');
            if (parallaxWrap) {
              gsap.fromTo(
                parallaxWrap,
                { yPercent: -3 },
                {
                  yPercent: 3,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.4,
                  },
                }
              );
            }
          }
        });
      },
      containerRef
    );

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  // Preload adjacent lightbox images for zero-flash Next/Prev swiping
  useEffect(() => {
    if (selectedPhotoIndex === null || GALLERY_ITEMS.length < 2) return;
    const prevIdx = (selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    const nextIdx = (selectedPhotoIndex + 1) % GALLERY_ITEMS.length;
    [prevIdx, nextIdx].forEach((idx) => {
      const img = new Image();
      img.src = GALLERY_ITEMS[idx].src;
    });
  }, [selectedPhotoIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && GALLERY_ITEMS.length > 0) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_ITEMS.length);
    }
  }, [selectedPhotoIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex !== null && GALLERY_ITEMS.length > 0) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  }, [selectedPhotoIndex]);

  // Keyboard controls for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') setSelectedPhotoIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleNext, handlePrev]);

  // Lock background page scroll while lightbox is open; compensate scrollbar width on desktop to prevent jump
  useEffect(() => {
    if (selectedPhotoIndex === null) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;

    if (isMobileView) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevBodyOverflow;
        document.documentElement.style.overflow = prevHtmlOverflow;
      };
    }

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
  }, [isMobileView, selectedPhotoIndex]);

  const lightboxModal =
    selectedPhotoIndex !== null && GALLERY_ITEMS[selectedPhotoIndex] ? (
      <div
        className={`fixed inset-0 z-50 bg-black/95 md:backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn touch-pan-y ${
          isMobileView ? 'gallery-mobile-lightbox' : 'gallery-desktop-lightbox'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Gallery photo preview"
        onClick={() => setSelectedPhotoIndex(null)}
        onTouchStart={(e) => {
          lightboxTouchStartXRef.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (lightboxTouchStartXRef.current === null) return;
          const deltaX =
            (e.changedTouches[0]?.clientX ?? lightboxTouchStartXRef.current) - lightboxTouchStartXRef.current;
          lightboxTouchStartXRef.current = null;
          if (deltaX < -45) handleNext();
          else if (deltaX > 45) handlePrev();
        }}
      >
        {/* Top Bar with Counter and Close Button */}
        <div
          className={`absolute flex items-center justify-between text-white pointer-events-none z-[10000] ${
            isMobileView
              ? 'left-4 right-4 top-[max(1rem,env(safe-area-inset-top))]'
              : 'left-6 right-6 top-4'
          }`}
        >
          <span className="text-xs sm:text-sm font-semibold text-slate-300 px-3.5 py-1.5 rounded-full bg-slate-800/85 shadow-md pointer-events-auto">
            {String(selectedPhotoIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPhotoIndex(null);
            }}
            className="w-11 h-11 rounded-full bg-slate-800/90 hover:bg-slate-700 text-white border border-white/25 transition-colors cursor-pointer shadow-lg pointer-events-auto flex items-center justify-center"
            title="Close (Esc)"
            aria-label="Close gallery lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Prev Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-800/85 hover:bg-slate-700 text-white border border-white/15 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 z-[10000]"
          title="Previous (Arrow Left)"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Centered Image Viewport */}
        <div
          className={isMobileView ? 'gallery-mobile-lightbox-stage' : 'gallery-desktop-lightbox-stage'}
        >
          <img
            src={GALLERY_ITEMS[selectedPhotoIndex].src}
            alt="Enlarged Gallery View"
            key={selectedPhotoIndex}
            decoding="async"
            onClick={(e) => e.stopPropagation()}
            className={`${
              isMobileView ? 'gallery-mobile-lightbox-img' : 'gallery-desktop-lightbox-img'
            } rounded-xl shadow-2xl select-none animate-scaleIn`}
          />
        </div>

        {/* Navigation Next Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-slate-800/85 hover:bg-slate-700 text-white border border-white/15 transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95 z-[10000]"
          title="Next (Arrow Right)"
          aria-label="Next photo"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    ) : null;

  return (
    <div className="bg-slate-50 min-h-screen" ref={containerRef}>
      
      {/* 1. Header Banner matching reference design */}
      <div className="relative py-14 sm:py-18 bg-slate-900 overflow-hidden text-center">
        {/* Background photo */}
        <img
          src="/assets/achievements_bg.jpg"
          alt="Gallery Banner"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
        />
        {/* Blue/black gradient overlay matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1829]/80 via-[#0a1829]/75 to-[#0a1829]/90" />

        {/* Content - Breadcrumbs (Home > Gallery) */}
        <div className="relative z-10 space-y-1">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Gallery
          </h1>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-200 font-medium pt-1">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-amber-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400 select-none">&gt;</span>
            <span className="text-white font-bold select-none">Gallery</span>
          </div>
        </div>
      </div>

      {/* 2. Section Title with Left & Right Divider Lines matching reference */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="flex items-center justify-center">
          <div className="grow border-t border-slate-300" />
          <h2 className="px-5 sm:px-8 text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#d95800] tracking-wide whitespace-nowrap">
            Explore Our Gallery
          </h2>
          <div className="grow border-t border-slate-300" />
        </div>
      </div>

      {/* 3. Uniform Grid - Sabka Box Size Exactly Same (Uniform aspect-[4/3] for every box) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        {GALLERY_ITEMS.length === 0 ? (
          <div className="py-16 sm:py-24 text-center rounded-2xl border border-dashed border-slate-300 bg-white/70">
            <p className="text-base sm:text-lg font-semibold text-slate-600">
              Project Gallery photos will be updated soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {GALLERY_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                data-direction={item.direction}
                className="gallery-grid-card"
              >
                {/* Every box has the exact same aspect-[4/3] uniform dimension */}
                <div
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer group"
                >
                  {/* Outer parallax wrapper keeps GSAP scroll translate separate from CSS hover scale */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="gallery-parallax-wrap w-full h-full top-0 md:h-[114%] md:-top-[7%] relative transform-gpu">
                      <img
                        src={item.src}
                        alt={`Fabrication Work ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] select-none transform-gpu"
                        loading={idx < 6 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                    </div>
                  </div>

                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/15 group-hover:bg-slate-950/35 transition-colors duration-300" />

                  {/* Subtle "View ↗" pill: visible softly on mobile touch, animated on desktop hover */}
                  <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 sm:translate-y-2 opacity-90 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]">
                    <span className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 md:backdrop-blur-md text-slate-900 text-[11px] sm:text-xs font-bold shadow-lg tracking-tight hover:bg-white">
                      <span>View</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Fullscreen Lightbox: portaled directly to document.body outside any parent transforms */}
      {typeof document !== 'undefined' && lightboxModal
        ? createPortal(lightboxModal, document.body)
        : lightboxModal}

    </div>
  );
};
