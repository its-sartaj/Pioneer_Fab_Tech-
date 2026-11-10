import React, { useRef, useState, useEffect } from 'react';

interface AutoSliderRowProps {
  children: React.ReactNode;
  intervalMs?: number;
  className?: string;
}

export const AutoSliderRow: React.FC<AutoSliderRowProps> = ({
  children,
  intervalMs = 3500,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isDraggingRef = useRef(false);
  const isTouchingRef = useRef(false);
  const touchCooldownRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const movedRef = useRef(false);

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

  // Auto-slide effect: advances smoothly when idle, never fights touch/drag or offscreen scroll
  useEffect(() => {
    if (isPaused || !isVisible) return;

    const timer = setInterval(() => {
      const el = containerRef.current;
      if (!el || isDraggingRef.current || isTouchingRef.current || document.hidden) return;

      const scrollStep = Math.min(300, el.clientWidth * 0.78);
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 4) return;

      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, isVisible, intervalMs]);

  useEffect(() => {
    return () => {
      if (touchCooldownRef.current) clearTimeout(touchCooldownRef.current);
    };
  }, []);

  // Touch handlers: yield control immediately to phone finger momentum
  const handleTouchStart = () => {
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

  // Mouse Drag to Scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    movedRef.current = false;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      movedRef.current = true;
    }
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onClickCapture={handleClickCapture}
      className={`flex items-center gap-4 sm:gap-5 overflow-x-auto overscroll-x-contain touch-pan-x py-3 px-1 cursor-grab active:cursor-grabbing select-none snap-x snap-proximity no-scrollbar ${className}`}
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {children}
    </div>
  );
};
