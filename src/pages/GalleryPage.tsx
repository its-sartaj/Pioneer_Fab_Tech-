import React, { useState, useEffect, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PageId } from '../components/Navbar';

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

// 21 Architectural & Industrial Fabrication Gallery Photos
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
];

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // GSAP ScrollTrigger Scroll Reveal + Subtle Parallax
  useEffect(() => {
    if (!containerRef.current || GALLERY_ITEMS.length === 0) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.gallery-grid-card');
      if (cards.length === 0) return;

      cards.forEach((card, index) => {
        const direction = card.getAttribute('data-direction');
        let initialX = 0;
        let initialY = 12;

        if (direction === 'left') {
          initialX = -10;
          initialY = 6;
        } else if (direction === 'right') {
          initialX = 10;
          initialY = 6;
        }

        // Fast, snappy reveal animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.985,
            x: initialX,
            y: initialY,
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 96%',
              toggleActions: 'play none none none',
            },
            delay: (index % 3) * 0.03, // 30ms light stagger
          }
        );

        // Very subtle scroll-based image parallax
        const parallaxImg = card.querySelector<HTMLElement>('.gallery-parallax-img');
        if (parallaxImg) {
          gsap.fromTo(
            parallaxImg,
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
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

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

  return (
    <div className="bg-slate-50 min-h-screen" ref={containerRef}>
      
      {/* 1. Header Banner matching reference design */}
      <div className="relative py-14 sm:py-18 bg-slate-900 overflow-hidden text-center">
        {/* Background photo */}
        <img
          src="/assets/achievements_bg.jpg"
          alt="Gallery Banner"
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
          <h2 className="px-5 sm:px-8 text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#e26922] tracking-wide whitespace-nowrap">
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
                className="gallery-grid-card will-change-[transform,opacity]"
              >
                {/* Every box has the exact same aspect-[4/3] uniform dimension */}
                <div
                  onClick={() => setSelectedPhotoIndex(idx)}
                  className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/90 shadow-sm hover:shadow-xl transition-shadow duration-400 cursor-pointer group"
                >
                  {/* Parallax inner image wrapper: headroom for 10-15px parallax movement */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={item.src}
                      alt="Fabrication Work"
                      onLoad={() => ScrollTrigger.refresh()}
                      className="gallery-parallax-img w-full h-[114%] -top-[7%] relative object-cover transition-transform duration-400 ease-out group-hover:scale-104 select-none"
                      loading="lazy"
                    />
                  </div>

                  {/* Subtle dark overlay on hover */}
                  <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/35 transition-colors duration-400" />

                  {/* Subtle "View ↗" reveal badge on hover */}
                  <div className="absolute bottom-4 right-4 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out">
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow-lg tracking-tight hover:bg-white">
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

      {/* 4. Fullscreen Lightbox Gallery with smooth scale & fade transition */}
      {selectedPhotoIndex !== null && GALLERY_ITEMS[selectedPhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          {/* Top Bar with Counter and Close Button */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between text-white pointer-events-none">
            <span className="text-xs sm:text-sm font-semibold text-slate-300 px-3.5 py-1.5 rounded-full bg-slate-800/80 backdrop-blur-xs shadow-md pointer-events-auto">
              {String(selectedPhotoIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
            </span>
            <button
              onClick={() => setSelectedPhotoIndex(null)}
              className="p-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer shadow-lg pointer-events-auto"
              title="Close (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            title="Previous (Arrow Left)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Centered Image Viewport with smooth scale-in */}
          <div
            className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={GALLERY_ITEMS[selectedPhotoIndex].src}
              alt="Enlarged Gallery View"
              key={selectedPhotoIndex}
              className="max-h-[85vh] max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl select-none animate-scaleIn transition-all duration-300"
            />
          </div>

          {/* Navigation Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-all cursor-pointer shadow-xl hover:scale-105 active:scale-95"
            title="Next (Arrow Right)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

    </div>
  );
};
