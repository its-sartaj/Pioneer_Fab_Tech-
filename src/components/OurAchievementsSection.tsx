import React, { useState, useEffect, useRef } from 'react';
import { DarkOrangeLiquidFill } from './DarkOrangeLiquidFill';

interface AchievementMetric {
  id: string;
  targetCount: number;
  suffix?: string;
  label: string;
  icon: 'user' | 'gear-wrench' | 'vessel' | 'bulb-gear';
}

const ACHIEVEMENTS: AchievementMetric[] = [
  {
    id: 'clients',
    targetCount: 500,
    suffix: '+',
    label: 'HAPPY CLIENT',
    icon: 'user',
  },
  {
    id: 'experience',
    targetCount: 10,
    suffix: '+',
    label: 'YEARS OF EXPERIENCE',
    icon: 'gear-wrench',
  },
  {
    id: 'delivery',
    targetCount: 1000,
    suffix: '+',
    label: 'PROJECT DELIVERY',
    icon: 'vessel',
  },
  {
    id: 'team',
    targetCount: 50,
    suffix: '+',
    label: 'OUR TEAM',
    icon: 'bulb-gear',
  },
];

export const OurAchievementsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const numberRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let rafId: number | null = null;

    const setFinalNumbers = () => {
      ACHIEVEMENTS.forEach((item) => {
        const el = numberRefs.current[item.id];
        if (el) el.textContent = String(item.targetCount);
      });
    };

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      setFinalNumbers();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          // Direct DOM text updates in rAF avoid 120fps React tree re-renders during scroll
          const duration = 700;
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 4);

            ACHIEVEMENTS.forEach((item) => {
              const el = numberRefs.current[item.id];
              if (el) {
                el.textContent = String(progress < 1 ? Math.floor(item.targetCount * ease) : item.targetCount);
              }
            });

            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            }
          };

          rafId = requestAnimationFrame(step);
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 80px 0px',
      }
    );

    observer.observe(node);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  // Render authentic white line icons matching image_c7f3798f.png
  const renderIcon = (type: AchievementMetric['icon']) => {
    switch (type) {
      case 'user':
        return (
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[1.6]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
          >
            {/* User head and shoulders outline matching screenshot */}
            <circle cx="32" cy="22" r="10" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M16 52c0-8.837 7.163-16 16-16s16 7.163 16 16"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* V-neck collar detail */}
            <path d="M26 36l6 8 6-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'gear-wrench':
        return (
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[1.6]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
          >
            {/* Gear with cross-wrench matching screenshot */}
            <path
              d="M32 18a14 14 0 100 28 14 14 0 000-28z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M32 10v4m0 36v4M10 32h4m36 0h4m-7-15l3-3m-28 28l3-3m0-22l-3-3m28 28l-3-3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="32" cy="32" r="7" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M23 41l18-18m-1 0a4 4 0 014 4l-3 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case 'vessel':
        return (
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[1.6]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
          >
            {/* Industrial vessel / tank with gauge & handles matching screenshot */}
            {/* Lid & top knob */}
            <path d="M28 12h8v3h-8z" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M18 19h28v4H18z" strokeLinecap="round" strokeLinejoin="round" />
            {/* Side handles */}
            <path d="M18 25H12v6h6m28-6h6v6h-6" strokeLinecap="round" strokeLinejoin="round" />
            {/* Vessel tank body */}
            <path
              d="M18 23v20c0 6.627 6.268 12 14 12s14-5.373 14-12V23"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Circular center pressure gauge */}
            <circle cx="32" cy="36" r="6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 36l3-3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );

      case 'bulb-gear':
        return (
          <svg
            className="w-14 h-14 sm:w-16 sm:h-16 text-white stroke-[1.6]"
            viewBox="0 0 64 64"
            fill="none"
            stroke="currentColor"
          >
            {/* Innovation lightbulb with internal gear matching screenshot */}
            <path
              d="M22 36c-2.4-2.8-4-6.4-4-10.4 0-7.7 6.3-14 14-14s14 6.3 14 14c0 4-1.6 7.6-4 10.4l-2 6H24l-2-6z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Base screw lines */}
            <path d="M26 46h12m-10 4h8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Internal gear outline */}
            <circle cx="32" cy="25" r="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 18v2m0 10v2m-7-7h2m10 0h2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 sm:py-24 lg:py-28 overflow-hidden bg-slate-950 text-white"
    >
      {/* Industrial factory night photograph background with dark overlay */}
      <img
        src="/assets/achievements_bg.jpg"
        alt="Industrial Engineering Plant"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
      />
      {/* Deep blue/slate overlay matching reference image */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#061224]/85 via-[#08182f]/80 to-[#061224]/90" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Heading matching image_c7f3798f.png */}
        <div className="text-center mb-12 sm:mb-16 reveal-word">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-wide">
            Our Achievements
          </h2>
        </div>

        {/* 4 Glassmorphic / Outlined Countable Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {ACHIEVEMENTS.map((item, idx) => {
            const delayClasses = ['', 'delay-75', 'delay-150', 'delay-200'];
            const staggerClass = delayClasses[idx] || '';
            const isTouchFilled = activeCardId === item.id;

            return (
              <div key={item.id} className={`reveal-on-scroll ${staggerClass}`}>
                <div
                  onClick={() => setActiveCardId((prev) => (prev === item.id ? null : item.id))}
                  className={`relative isolate overflow-hidden rounded-2xl sm:rounded-3xl border bg-[#0a1d37]/80 md:bg-[#091b34]/75 p-7 sm:p-9 text-center flex flex-col items-center justify-between min-h-[260px] sm:min-h-[340px] shadow-xl hover:border-[#ea6800]/90 hover:shadow-[0_14px_38px_rgba(219,93,0,0.45)] transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group hover:-translate-y-2 cursor-pointer ${
                    isTouchFilled
                      ? 'is-touch-active border-[#ea6800]/90 shadow-[0_14px_38px_rgba(219,93,0,0.45)] -translate-y-1'
                      : 'border-white/35'
                  }`}
                >
                  {/* Animated Dark Orange Liquid Fill with Rising Wave */}
                  <DarkOrangeLiquidFill />
                  
                  {/* Subtle soft sheen highlight */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-500 pointer-events-none z-0 ${
                      isTouchFilled ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  {/* 1. White Line Icon */}
                  <div className={`relative z-10 pt-2 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 ${isTouchFilled ? 'scale-110' : ''}`}>
                    {renderIcon(item.icon)}
                  </div>

                  {/* 2. Dark Orange Accent Divider Line (GPU scaleX, zero layout reflow) */}
                  <div className={`relative z-10 w-12 sm:w-14 h-0.5 mx-auto my-4 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-125 group-hover:bg-white ${isTouchFilled ? 'scale-x-125 bg-white' : 'bg-[#ea6800]'}`} />

                  {/* 3. Big Countable Number with + suffix */}
                  <div className="relative z-10 flex items-baseline justify-center">
                    <span
                      ref={(el) => {
                        numberRefs.current[item.id] = el;
                      }}
                      className="text-5xl sm:text-6xl font-black text-white tracking-tight font-sans select-none tabular-nums"
                    >
                      0
                    </span>
                    <span className="text-4xl sm:text-5xl font-black text-white select-none ml-0.5">
                      {item.suffix || '+'}
                    </span>
                  </div>

                  {/* 4. Subtitle Label in Uppercase */}
                  <div className="relative z-10 pb-1 mt-3">
                    <h3 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-white/95 select-none">
                      {item.label}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
