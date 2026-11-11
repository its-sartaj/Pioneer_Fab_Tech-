import React, { useEffect, useRef } from 'react';
import { METRICS } from '../data/siteData';
import { Award, CheckCircle2, Users2, Construction } from 'lucide-react';

interface CountableStatsProps {
  className?: string;
}

const iconsMap: Record<string, React.ElementType> = {
  exp: Award,
  delivered: CheckCircle2,
  clients: Users2,
  ongoing: Construction,
};

export const CountableStats: React.FC<CountableStatsProps> = ({ className = '' }) => {
  const hasAnimatedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Record<string, HTMLSpanElement | null>>({});

  useEffect(() => {
    let rafId: number | null = null;

    const setFinalNumbers = () => {
      METRICS.forEach((metric) => {
        const el = numberRefs.current[metric.id];
        if (el) el.textContent = String(metric.count);
      });
    };

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setFinalNumbers();
      return;
    }

    const startAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const duration = 1200;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);

        METRICS.forEach((metric) => {
          const el = numberRefs.current[metric.id];
          if (el) {
            el.textContent = String(progress < 1 ? Math.floor(metric.count * ease) : metric.count);
          }
        });

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        }
      };

      rafId = requestAnimationFrame(animate);
    };

    if (!('IntersectionObserver' in window)) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const timer = setTimeout(() => {
      startAnimation();
    }, 500);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {METRICS.map((metric) => {
          const Icon = iconsMap[metric.id] || Award;

          return (
            <div
              key={metric.id}
              className="relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200/90 hover:shadow-md hover:border-amber-300 transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                  {metric.hindiLabel}
                </span>
              </div>

              <div className="flex items-baseline gap-0.5">
                <span
                  ref={(el) => {
                    numberRefs.current[metric.id] = el;
                  }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums"
                >
                  0
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-500">
                  {metric.suffix}
                </span>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-800 mt-2">
                {metric.label}
              </h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                {metric.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
