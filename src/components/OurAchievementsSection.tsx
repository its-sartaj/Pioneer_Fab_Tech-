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
  const [counts, setCounts] = useState<Record<string, number>>({
    clients: 0,
    experience: 0,
    delivery: 0,
    team: 0,
  });

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    let rafId: number | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          // Animate counting numbers smoothly & quickly
          const duration = 700;
          const startTime = performance.now();

          const step = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out quart curve
            const ease = 1 - Math.pow(1 - progress, 4);

            setCounts({
              clients: Math.floor(500 * ease),
              experience: Math.floor(10 * ease),
              delivery: Math.floor(1000 * ease),
              team: Math.floor(50 * ease),
            });

            if (progress < 1) {
              rafId = requestAnimationFrame(step);
            } else {
              setCounts({
                clients: 500,
                experience: 10,
                delivery: 1000,
                team: 50,
              });
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
            const currentNumber = counts[item.id] || 0;
            const delayClasses = ['', 'delay-75', 'delay-150', 'delay-200'];
            const staggerClass = delayClasses[idx] || '';

            return (
              <div key={item.id} className={`reveal-on-scroll ${staggerClass}`}>
                <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl border border-white/35 bg-white/[0.04] backdrop-blur-xs p-8 sm:p-9 text-center flex flex-col items-center justify-between min-h-[300px] sm:min-h-[340px] shadow-xl hover:border-[#ea6800]/90 hover:shadow-[0_14px_38px_rgba(219,93,0,0.45)] transition-all duration-300 ease-out group hover:-translate-y-2 cursor-pointer">
                  {/* Animated Dark Orange Liquid Fill with Rising Wave */}
                  <DarkOrangeLiquidFill />
                  
                  {/* Subtle soft sheen highlight */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100 pointer-events-none z-0" 
                  />

                  {/* 1. White Line Icon */}
                  <div className="relative z-10 pt-2 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {renderIcon(item.icon)}
                  </div>

                  {/* 2. Dark Orange Accent Divider Line */}
                  <div className="relative z-10 w-12 sm:w-14 h-0.5 bg-[#e26922] mx-auto my-4 transition-all duration-300 group-hover:w-18 group-hover:bg-white" />

                  {/* 3. Big Countable Number with + suffix */}
                  <div className="relative z-10 flex items-baseline justify-center">
                    <span className="text-5xl sm:text-6xl font-black text-white tracking-tight font-sans select-none tabular-nums">
                      {currentNumber}
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
