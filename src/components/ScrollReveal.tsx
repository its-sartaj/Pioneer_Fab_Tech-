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

    const revealIfVisible = (el: Element, observer: IntersectionObserver) => {
      const rect = el.getBoundingClientRect();
      // Trigger once element enters viewport or if already scrolled above viewport
      if (rect.top <= window.innerHeight * 0.96 && rect.bottom >= 0) {
        el.classList.add('is-revealed');
        observer.unobserve(el);
        return true;
      }
      if (rect.bottom < 0) {
        // Already scrolled past on initial load / back-navigation: reveal immediately
        el.classList.add('is-revealed');
        observer.unobserve(el);
        return true;
      }
      return false;
    };

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
        threshold: 0.04,
        rootMargin: '0px 0px -24px 0px',
      }
    );

    const observeAll = () => {
      const targets = document.querySelectorAll(UNREVEALED_SELECTOR);
      targets.forEach((target) => {
        if (!revealIfVisible(target, observer)) {
          observer.observe(target);
        }
      });
    };

    // Initial observation
    observeAll();
    const timer = setTimeout(observeAll, 120);

    // Watch dynamic DOM changes (filter tabs, single-item views, async content)
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Scroll failsafe for very tall sections or fast programmatic jumps
    let rafId: number | null = null;
    const onScrollCheck = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        document.querySelectorAll(UNREVEALED_SELECTOR).forEach((el) => {
          revealIfVisible(el, observer);
        });
      });
    };
    window.addEventListener('scroll', onScrollCheck, { passive: true });

    return () => {
      clearTimeout(timer);
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollCheck);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [triggerKey]);
};
