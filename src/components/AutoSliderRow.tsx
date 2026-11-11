import React, { useRef, useState, useEffect, useCallback } from 'react';

interface AutoSliderRowProps {
  children: React.ReactNode;
  intervalMs?: number;
  className?: string;
}

export const AutoSliderRow: React.FC<AutoSliderRowProps> = ({
  children,
  intervalMs = 3500,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const touchCooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startPageXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const lastDragXRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const movedRef = useRef(false);
  const scrollAnimRafRef = useRef<number | null>(null);
  const momentumRafRef = useRef<number | null>(null);

  const cancelAnimations = useCallback(() => {
    if (scrollAnimRafRef.current !== null) {
      cancelAnimationFrame(scrollAnimRafRef.current);
      scrollAnimRafRef.current = null;
    }
    if (momentumRafRef.current !== null) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
  }, []);

  // Smooth rAF cubic ease-in-out scroll (never fights CSS scroll-snap)
  const animateScrollTo = useCallback(
    (targetLeft: number, durationMs = 720) => {
      const el = containerRef.current;
      if (!el) return;
      cancelAnimations();

      const maxScroll = Math.max(0, el.scrollWidth - el.clientWidth);
      const clampedTarget = Math.min(Math.max(0, targetLeft), maxScroll);
      const startLeft = el.scrollLeft;
      const distance = clampedTarget - startLeft;
      if (Math.abs(distance) < 1) return;

      const startTime = performance.now();
      const easeInOutCubic = (t: number) =>
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        el.scrollLeft = startLeft + distance * easeInOutCubic(progress);
        if (progress < 1) {
          scrollAnimRafRef.current = requestAnimationFrame(step);
        } else {
          scrollAnimRafRef.current = null;
        }
      };

      scrollAnimRafRef.current = requestAnimationFrame(step);
    },
    [cancelAnimations]
  );

  // Only auto-advance while slider is visible on screen
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

  // Auto-slide effect: smooth eased glide when idle, never fights touch/drag/wheel
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (isPaused || !isVisible || prefersReduced) return;

    const timer = setInterval(() => {
      const el = containerRef.current;
      if (!el || isDraggingRef.current || isTouchingRef.current || document.hidden) return;

      const scrollStep = Math.min(340, el.clientWidth * 0.78);
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 4) return;

      if (el.scrollLeft >= maxScroll - 18) {
        animateScrollTo(0, 920);
      } else {
        animateScrollTo(el.scrollLeft + scrollStep, 700);
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, isVisible, intervalMs, animateScrollTo]);

  useEffect(() => {
    return () => {
      cancelAnimations();
      if (touchCooldownRef.current) clearTimeout(touchCooldownRef.current);
    };
  }, [cancelAnimations]);

  // Touch handlers: yield control immediately to phone finger momentum
  const handleTouchStart = () => {
    cancelAnimations();
    isTouchingRef.current = true;
    setIsPaused(true);
    if (touchCooldownRef.current) clearTimeout(touchCooldownRef.current);
  };

  const handleTouchEnd = () => {
    isTouchingRef.current = false;
    if (touchCooldownRef.current) clearTimeout(touchCooldownRef.current);
    touchCooldownRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 3200);
  };

  // Mouse Drag to Scroll with smooth inertia coasting on release
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const el = containerRef.current;
    if (!el) return;
    cancelAnimations();
    isDraggingRef.current = true;
    movedRef.current = false;
    startPageXRef.current = e.pageX;
    startScrollLeftRef.current = el.scrollLeft;
    lastDragXRef.current = e.pageX;
    lastDragTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();

    const now = performance.now();
    const dt = Math.max(now - lastDragTimeRef.current, 1);
    const dx = e.pageX - lastDragXRef.current;
    const instantVel = (-dx / dt) * 16; // px per 16ms frame
    velocityRef.current = velocityRef.current * 0.6 + instantVel * 0.4;
    lastDragXRef.current = e.pageX;
    lastDragTimeRef.current = now;

    const totalWalk = (e.pageX - startPageXRef.current) * 1.15;
    if (Math.abs(totalWalk) > 5) {
      movedRef.current = true;
    }
    el.scrollLeft = startScrollLeftRef.current - totalWalk;
  };

  const startMomentumCoast = () => {
    const el = containerRef.current;
    let vel = velocityRef.current;
    if (!el || Math.abs(vel) < 0.8) return;

    const coast = () => {
      vel *= 0.93;
      if (Math.abs(vel) < 0.35) {
        momentumRafRef.current = null;
        return;
      }
      const maxScroll = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + vel;
      if (next <= 0 || next >= maxScroll) {
        el.scrollLeft = Math.min(Math.max(0, next), maxScroll);
        momentumRafRef.current = null;
        return;
      }
      el.scrollLeft = next;
      momentumRafRef.current = requestAnimationFrame(coast);
    };

    momentumRafRef.current = requestAnimationFrame(coast);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (movedRef.current) {
      startMomentumCoast();
    }
  };

  // Prevent accidental item click when user was dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (movedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      movedRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        handleMouseUpOrLeave();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onWheel={cancelAnimations}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onClickCapture={handleClickCapture}
      className={`flex items-center gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain touch-pan-x py-3 px-1 cursor-grab active:cursor-grabbing select-none no-scrollbar ${className}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {children}
    </div>
  );
};
