import React, { useState, useEffect, useRef } from 'react';
import { PageId } from './Navbar';

interface HeroSliderProps {
  onNavigate?: (page: PageId) => void;
}

interface SlideItem {
  id: number;
  image: string;
  badge: string;
  headline: string;
  description: string;
  specs: string[];
  projectTag: string;
}

const SLIDES: SlideItem[] = [
  {
    id: 1,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.00_PM__1__3cfa08e4.jpeg',
    badge: 'Architectural Structural Fabrication',
    headline: 'Architectural Steel & Precision Spiral Staircases',
    description: 'Bespoke helical staircases, double-height atrium steelwork, and floor-to-ceiling glass lobby installations engineered with IS 2062 heavy structural steel and master craftsmanship.',
    specs: ['Bespoke Helical Geometry', 'IS 2062 Tested Steel', 'Turnkey Site Erection'],
    projectTag: 'Modern Glass Atrium & Helical Staircase',
  },
  {
    id: 2,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.01_PM_5eb73795.jpeg',
    badge: 'CNC Fiber Laser & PVD Coating',
    headline: 'Luxury CNC Laser Cut Jali & Decorative Partitions',
    description: 'Sub-millimeter CNC fiber laser cut metal screens, luxury titanium PVD gold partitions, and architectural geometric room dividers for premium residences and hospitality interiors.',
    specs: ['0.1mm Precision Laser Cut', 'Titanium PVD Gold Coating', 'Grade 304 / 316 Stainless Steel'],
    projectTag: 'Geometric Cubic PVD Gold Partition',
  },
  {
    id: 3,
    image: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_1.04.04_PM__1__313234b2.jpeg',
    badge: 'Commercial Facades & Glazing',
    headline: 'Commercial Glass Facades & Boutique Storefronts',
    description: 'Heavy-duty stainless steel & aluminium architectural storefronts, frameless structural glass facades, and automated luxury commercial entrance systems engineered for lasting durability.',
    specs: ['Toughened Safety Glass', 'Precision Weather Seals', 'Architectural Portal Framing'],
    projectTag: 'Boutique Storefront & Commercial Entrance',
  },
];

export const HeroSlider: React.FC<HeroSliderProps> = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isVisible, setIsVisible] = useState(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const SLIDE_DURATION = 4500; // 4.5 seconds auto slide

  // Trigger smooth Ken Burns scale on slide 0 right after mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const advanceSlide = (getNext: (curr: number) => number, nextDir: 'up' | 'down') => {
    setCurrentIdx((curr) => {
      const next = getNext(curr);
      if (next !== curr) {
        setPrevIdx(curr);
        if (exitClearTimerRef.current) clearTimeout(exitClearTimerRef.current);
        exitClearTimerRef.current = setTimeout(() => setPrevIdx(null), 1150);
      }
      return next;
    });
    setDirection(nextDir);
  };

  useEffect(() => {
    return () => {
      if (exitClearTimerRef.current) clearTimeout(exitClearTimerRef.current);
    };
  }, []);

  // Pause hero auto-advance when scrolled out of view or tab is hidden to save mobile CPU/GPU
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0]?.isIntersecting ?? true);
      },
      { threshold: 0.05 }
    );
    observer.observe(node);

    const onVisibility = () => {
      setIsVisible(!document.hidden && (node.getBoundingClientRect().bottom > 0));
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    timerRef.current = setInterval(() => {
      setDirection((prev) => {
        const nextDir = prev === 'up' ? 'down' : 'up';
        advanceSlide((idx) => (idx + 1) % SLIDES.length, nextDir);
        return nextDir;
      });
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isVisible]);

  // Smooth horizontal touch swipe support for mobile users
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = (e.changedTouches[0]?.clientX ?? touchStartXRef.current) - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) > 45) {
      if (timerRef.current) clearInterval(timerRef.current);
      const nextDir = deltaX < 0 ? 'up' : 'down';
      advanceSlide(
        (idx) => (deltaX < 0 ? (idx + 1) % SLIDES.length : (idx - 1 + SLIDES.length) % SLIDES.length),
        nextDir
      );
      if (isVisible) {
        timerRef.current = setInterval(() => {
          setDirection((prev) => {
            const autoDir = prev === 'up' ? 'down' : 'up';
            advanceSlide((idx) => (idx + 1) % SLIDES.length, autoDir);
            return autoDir;
          });
        }, SLIDE_DURATION);
      }
    }
  };

  const currentSlide = SLIDES[currentIdx];

  return (
    <section
      ref={sectionRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[500px] sm:min-h-[620px] lg:min-h-[700px] flex items-center"
    >
      
      {/* =========================================================================
          FULL-BLEED BACKGROUND IMAGES (PURA IMAGE AS BACKGROUND)
          With smooth GPU-composited Ken Burns zoom ("aage-piche" motion)
         ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {SLIDES.map((slide, idx) => {
          const isActive = currentIdx === idx;
          const isExiting = prevIdx === idx && !isActive;
          const isZoomed = (isActive && hasEntered) || isExiting;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.headline}
                loading="eager"
                decoding={idx === 0 ? 'sync' : 'async'}
                fetchPriority={idx === 0 ? 'high' : 'low'}
                className={`w-full h-full object-cover object-center sm:object-[center_35%] transform-gpu ${
                  isActive || isExiting
                    ? 'transition-transform duration-[4500ms] ease-out'
                    : 'transition-none'
                } ${isZoomed ? 'scale-[1.07] will-change-transform' : 'scale-100'}`}
              />
            </div>
          );
        })}

        {/* Natural Vignette Overlay: Dark on the left for crisp text readability, 
            completely clear on the right so the image is 100% visible and clean */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-950/15 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 z-20 pointer-events-none" />
      </div>

      {/* =========================================================================
          CONTENT OVERLAY: PURE CLEAN HUMAN TYPOGRAPHY (NO "LAL PILA" TEXT)
         ========================================================================= */}
      <div className="relative z-30 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">

          {/* Premium Architectural Display Headline */}
          <div 
            key={`title-${currentSlide.id}`}
            className={direction === 'up' ? 'animate-hero-up' : 'animate-hero-down'}
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[3.85rem] font-bold tracking-tight text-white leading-[1.14]">
              {currentSlide.headline}
            </h1>
          </div>

          {/* Refined Premium Description */}
          <p 
            key={`desc-${currentSlide.id}`}
            className={`font-hero-desc text-base sm:text-lg lg:text-[1.125rem] text-slate-200/90 leading-relaxed font-normal max-w-2xl ${
              direction === 'up' ? 'animate-hero-up' : 'animate-hero-down'
            }`}
          >
            {currentSlide.description}
          </p>

        </div>
      </div>

    </section>
  );
};
