import React, { useState, useEffect, useRef } from 'react';
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
  const [counts, setCounts] = useState<Record<string, number>>({
    delivered: 0,
    clients: 0,
    ongoing: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check intersection or animate immediately
    const startAnimation = () => {
      if (hasAnimated) return;
      setHasAnimated(true);

      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing curve (ease-out quart)
        const ease = 1 - Math.pow(1 - progress, 4);

        setCounts({
          delivered: Math.floor(850 * ease),
          clients: Math.floor(620 * ease),
          ongoing: Math.floor(28 * ease),
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCounts({
            delivered: 850,
            clients: 620,
            ongoing: 28,
          });
        }
      };

      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Fallback if not observed in 400ms
    const timer = setTimeout(() => {
      startAnimation();
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [hasAnimated]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {METRICS.map((metric) => {
          const Icon = iconsMap[metric.id] || Award;
          const currentVal = counts[metric.id] || 0;

          return (
            <div
              key={metric.id}
              className="relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200/90 hover:shadow-md hover:border-amber-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-sm bg-slate-100 text-slate-600">
                  {metric.hindiLabel}
                </span>
              </div>

              <div className="flex items-baseline gap-0.5">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-mono tabular-nums">
                  {currentVal}
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
