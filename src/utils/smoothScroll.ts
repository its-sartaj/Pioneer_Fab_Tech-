/**
 * Lightweight frame-rate-independent smooth wheel & programmatic scrolling.
 * - Smooths discrete mouse-wheel ticks on desktop at monitor refresh rate (60-240Hz)
 * - Leaves native touch momentum on phones/tablets 100% untouched
 * - Automatically yields to inner scrollable containers, iframes, locked modals,
 *   keyboard/scrollbar navigation, and `prefers-reduced-motion: reduce`
 */

const LAMBDA = 11.5; // Smooth yet crisp settling (~95% settled in ~260ms)
const STOP_THRESHOLD_PX = 0.35;
const EXTERNAL_SCROLL_TOLERANCE_PX = 4;

let currentY = 0;
let targetY = 0;
let lastWrittenY = 0;
let rafId: number | null = null;
let lastFrameTime = 0;
let isInitialized = false;

const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined' || !window.matchMedia) return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const isPageScrollLocked = (): boolean => {
  if (typeof document === 'undefined') return true;
  return (
    document.body.style.overflow === 'hidden' ||
    document.documentElement.style.overflow === 'hidden'
  );
};

const getMaxScrollY = (): number => {
  const docEl = document.documentElement;
  return Math.max(0, docEl.scrollHeight - window.innerHeight);
};

const clampY = (y: number): number => Math.min(Math.max(0, y), getMaxScrollY());

const stopAnimation = () => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  lastFrameTime = 0;
};

/**
 * Checks whether a scrollable ancestor (dropdown, modal stage, drawer, textarea, iframe)
 * should consume this wheel delta natively instead of scrolling the main document.
 */
const shouldYieldToNestedTarget = (target: EventTarget | null, deltaY: number): boolean => {
  let node = target instanceof Element ? target : null;

  while (node && node !== document.body && node !== document.documentElement) {
    const tag = node.tagName;
    if (tag === 'IFRAME' || tag === 'SELECT' || tag === 'TEXTAREA') {
      return true;
    }
    if (node.hasAttribute('data-native-scroll') || node.hasAttribute('data-lenis-prevent')) {
      return true;
    }

    const style = window.getComputedStyle(node);
    const overflowY = style.overflowY;
    if (overflowY === 'auto' || overflowY === 'scroll') {
      const scrollableSpace = node.scrollHeight - node.clientHeight;
      if (scrollableSpace > 1) {
        const atTop = node.scrollTop <= 0;
        const atBottom = node.scrollTop >= scrollableSpace - 1;
        if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
          return true;
        }
      }
    }

    node = node.parentElement;
  }

  return false;
};

const normalizeWheelDeltaY = (e: WheelEvent): number => {
  let delta = e.deltaY;
  if (e.deltaMode === 1) {
    delta *= 18;
  } else if (e.deltaMode === 2) {
    delta *= window.innerHeight * 0.85;
  }
  return Math.min(Math.max(delta, -420), 420);
};

const stepAnimation = (now: number) => {
  if (isPageScrollLocked() || prefersReducedMotion()) {
    stopAnimation();
    return;
  }

  if (!lastFrameTime) {
    lastFrameTime = now;
  }

  const dt = Math.min((now - lastFrameTime) / 1000, 0.05);
  lastFrameTime = now;

  // Clamp target in case document height changed (e.g. lazy content load)
  targetY = clampY(targetY);

  const diff = targetY - currentY;
  if (Math.abs(diff) <= STOP_THRESHOLD_PX) {
    currentY = targetY;
    lastWrittenY = currentY;
    window.scrollTo({ top: currentY, behavior: 'instant' as ScrollBehavior });
    stopAnimation();
    return;
  }

  const factor = 1 - Math.exp(-LAMBDA * dt);
  currentY += diff * factor;
  lastWrittenY = currentY;
  window.scrollTo({ top: currentY, behavior: 'instant' as ScrollBehavior });

  rafId = requestAnimationFrame(stepAnimation);
};

const startAnimation = () => {
  if (rafId !== null) return;
  lastFrameTime = 0;
  rafId = requestAnimationFrame(stepAnimation);
};

/**
 * Syncs internal scroll coordinates with actual window.scrollY.
 * Call after instant jumps (e.g. route changes).
 */
export const syncSmoothScroll = (knownY?: number) => {
  if (typeof window === 'undefined') return;
  stopAnimation();
  const y = typeof knownY === 'number' ? knownY : window.scrollY;
  currentY = y;
  targetY = y;
  lastWrittenY = y;
};

/**
 * Smoothly scrolls window to a target Y position (or immediately when reduced motion / immediate is set).
 */
export const smoothScrollTo = (y: number, options?: { immediate?: boolean }) => {
  if (typeof window === 'undefined') return;
  const clamped = clampY(y);

  if (options?.immediate || prefersReducedMotion() || !isInitialized) {
    stopAnimation();
    window.scrollTo({ top: clamped, behavior: options?.immediate ? ('instant' as ScrollBehavior) : 'smooth' });
    currentY = clamped;
    targetY = clamped;
    lastWrittenY = clamped;
    return;
  }

  if (rafId === null) {
    currentY = window.scrollY;
  }
  targetY = clamped;
  startAnimation();
};

/**
 * Smoothly scrolls an element into view just below the sticky header.
 */
export const smoothScrollIntoView = (element: HTMLElement | null, extraOffset = 16) => {
  if (!element || typeof window === 'undefined') return;
  const header = document.querySelector('header');
  const headerHeight = header ? header.getBoundingClientRect().height : 0;
  const elementTop = element.getBoundingClientRect().top + window.scrollY;
  const destination = Math.max(0, elementTop - headerHeight - extraOffset);
  smoothScrollTo(destination);
};

/**
 * Attaches global smooth wheel scrolling for desktop/laptop pointers.
 * Returns a cleanup function for React root unmount.
 */
export const initSmoothScroll = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  isInitialized = true;
  syncSmoothScroll(window.scrollY);

  const onWheel = (e: WheelEvent) => {
    // Allow browser zoom, horizontal scrolling, reduced-motion, or locked overlays
    if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
    if (prefersReducedMotion() || isPageScrollLocked()) return;
    if (shouldYieldToNestedTarget(e.target, e.deltaY)) return;

    const delta = normalizeWheelDeltaY(e);
    if (delta === 0) return;

    // If not currently mid-glide, anchor to real scrollY before adding delta
    if (rafId === null) {
      currentY = window.scrollY;
      targetY = currentY;
      lastWrittenY = currentY;
    }

    const nextTarget = clampY(targetY + delta);
    // At boundaries with nothing further to scroll, let native overscroll/rubber-band work
    if (Math.abs(nextTarget - currentY) < 0.5 && Math.abs(targetY - currentY) < 0.5) {
      return;
    }

    e.preventDefault();
    targetY = nextTarget;
    startAnimation();
  };

  // Yield immediately whenever user scrolls externally (scrollbar drag, keyboard, Find-in-page)
  const onNativeScroll = () => {
    if (rafId === null) {
      currentY = window.scrollY;
      targetY = currentY;
      lastWrittenY = currentY;
      return;
    }
    if (Math.abs(window.scrollY - lastWrittenY) > EXTERNAL_SCROLL_TOLERANCE_PX) {
      syncSmoothScroll(window.scrollY);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (
      e.key === 'ArrowUp' ||
      e.key === 'ArrowDown' ||
      e.key === 'PageUp' ||
      e.key === 'PageDown' ||
      e.key === 'Home' ||
      e.key === 'End' ||
      e.key === ' '
    ) {
      if (rafId !== null) {
        syncSmoothScroll(window.scrollY);
      }
    }
  };

  const onPointerOrTouchStart = () => {
    if (rafId !== null) {
      syncSmoothScroll(window.scrollY);
    }
  };

  const onResize = () => {
    targetY = clampY(targetY);
    currentY = clampY(currentY);
  };

  window.addEventListener('wheel', onWheel, { passive: false });
  window.addEventListener('scroll', onNativeScroll, { passive: true });
  window.addEventListener('keydown', onKeyDown, { passive: true });
  window.addEventListener('touchstart', onPointerOrTouchStart, { passive: true });
  window.addEventListener('mousedown', onPointerOrTouchStart, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });

  return () => {
    stopAnimation();
    isInitialized = false;
    window.removeEventListener('wheel', onWheel);
    window.removeEventListener('scroll', onNativeScroll);
    window.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('touchstart', onPointerOrTouchStart);
    window.removeEventListener('mousedown', onPointerOrTouchStart);
    window.removeEventListener('resize', onResize);
  };
};
