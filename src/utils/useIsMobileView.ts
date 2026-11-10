import { useState, useEffect } from 'react';

/**
 * Tracks whether the viewport matches a mobile width (`<= 768px`).
 * Returns `false` by default in non-browser contexts so desktop SSR/initial state is preserved.
 */
export function useIsMobileView(maxWidthPx = 768): boolean {
  const [isMobileView, setIsMobileView] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.matchMedia(`(max-width: ${maxWidthPx}px)`).matches : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const onChange = (event: MediaQueryListEvent) => setIsMobileView(event.matches);

    setIsMobileView(mql.matches);
    if (typeof mql.addEventListener === 'function') {
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    }

    mql.addListener(onChange);
    return () => mql.removeListener(onChange);
  }, [maxWidthPx]);

  return isMobileView;
}
