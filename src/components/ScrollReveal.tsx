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
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add('is-revealed'));
      return;
    }

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
        threshold: 0.01,
        rootMargin: '40px 0px -12px 0px',
      }
    );

    const observedSet = new WeakSet<Element>();
    let pendingObserveRaf: number | null = null;

    const observeAll = () => {
      const targets = document.querySelectorAll(UNREVEALED_SELECTOR);
      const viewportBottom = window.innerHeight * 0.98;

      targets.forEach((target) => {
        if (observedSet.has(target)) return;
        const rect = target.getBoundingClientRect();

        if (rect.top <= viewportBottom) {
          // Already in view or scrolled past on initial load / back navigation
          target.classList.add('is-revealed');
        } else {
          observedSet.add(target);
          observer.observe(target);
        }
      });
    };

    // Initial observation
    observeAll();
    const timer = setTimeout(observeAll, 140);

    // Watch ONLY structural DOM additions (skip counter text ticks & attribute flips)
    const mutationObserver = new MutationObserver((mutations) => {
      let hasNewElements = false;
      for (let i = 0; i < mutations.length; i++) {
        const added = mutations[i].addedNodes;
        for (let j = 0; j < added.length; j++) {
          if (added[j].nodeType === 1) {
            hasNewElements = true;
            break;
          }
        }
        if (hasNewElements) break;
      }

      if (hasNewElements && pendingObserveRaf === null) {
        pendingObserveRaf = requestAnimationFrame(() => {
          pendingObserveRaf = null;
          observeAll();
        });
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      if (pendingObserveRaf !== null) cancelAnimationFrame(pendingObserveRaf);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [triggerKey]);
};
