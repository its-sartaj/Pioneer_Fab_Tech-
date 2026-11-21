import React, { useEffect, useRef, useState } from 'react';

export type RevealVariant = 'word' | 'image' | 'up' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number; // milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

/**
 * ScrollReveal Component
 * Smoothly reveals words, images, or containers from below when scrolled into view.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'up',
  delay = 0,
  className = '',
  threshold = 0.12,
  once = true,
}) => {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = domRef.current;
    if (!node) return;

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px 80px 0px', // trigger before reaching viewport bottom for instant snappy reveal
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  // Variant class mappings
  const variantClass = 
    variant === 'word' 
      ? 'reveal-word' 
      : variant === 'image' 
      ? 'reveal-image' 
      : variant === 'left' 
      ? 'reveal-from-left' 
      : variant === 'right' 
      ? 'reveal-from-right' 
      : 'reveal-on-scroll';

  return (
    <div
      ref={domRef}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`${variantClass} ${isVisible ? 'is-revealed' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

const REVEAL_SELECTOR =
  '.reveal-on-scroll, .reveal-word, .reveal-image, .reveal-from-left, .reveal-from-right';
const UNREVEALED_SELECTOR =
  '.reveal-on-scroll:not(.is-revealed), .reveal-word:not(.is-revealed), .reveal-image:not(.is-revealed), .reveal-from-left:not(.is-revealed), .reveal-from-right:not(.is-revealed)';

/**
 * Global Scroll Reveal Initializer Hook
 * Automatically watches any element with classes:
 * .reveal-on-scroll, .reveal-word, .reveal-image, .reveal-from-left, .reveal-from-right
 */
export const useGlobalScrollReveal = (triggerKey?: unknown) => {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(max-width: 768px)').matches;

    // On mobile devices and reduced-motion, reveal all immediately with zero CPU/layout overhead
    if (prefersReduced || isMobile || !('IntersectionObserver' in window)) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const observedSet = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 100px 0px',
      }
    );

    const observeAll = () => {
      const targets = document.querySelectorAll(UNREVEALED_SELECTOR);
      for (let i = 0; i < targets.length; i++) {
        const target = targets[i];
        if (!observedSet.has(target)) {
          observedSet.add(target);
          observer.observe(target);
        }
      }
    };

    // Initial observation
    observeAll();
    const timer = setTimeout(observeAll, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [triggerKey]);
};
