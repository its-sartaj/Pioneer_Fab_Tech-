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
  const [isHovered, setIsHovered] = useState(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const movedRef = useRef(false);

  // Auto-slide effect: slowly advances card-by-card periodically with no arrows
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      const el = containerRef.current;
      if (!el || isDraggingRef.current) return;

      const scrollStep = Math.min(300, el.clientWidth * 0.75);
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 15) {
        // Smoothly loop back to start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollStep, behavior: 'smooth' });
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isHovered, intervalMs]);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseUpOrLeave();
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onClickCapture={handleClickCapture}
      className={`flex items-center gap-4 sm:gap-5 overflow-x-auto scroll-smooth py-3 px-1 cursor-grab active:cursor-grabbing select-none snap-x snap-mandatory ${className}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {children}
    </div>
  );
};
