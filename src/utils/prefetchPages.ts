import type { PageId } from '../components/Navbar';

export const pageLoaders = {
  about: () => import('../pages/AboutPage'),
  services: () => import('../pages/ServicesPage'),
  projects: () => import('../pages/ProjectsPage'),
  gallery: () => import('../pages/GalleryPage'),
  materials: () => import('../pages/MaterialSupplyPage'),
  infrastructure: () => import('../pages/MaterialSupplyPage'),
  certificates: () => import('../pages/CertificatesPage'),
  contact: () => import('../pages/ContactPage'),
  enquiry: () => import('../pages/EnquiryPage'),
} as const;

const prefetchedSet = new Set<string>();

/**
 * Warms a single lazy route chunk ahead of click (e.g. on nav hover/focus).
 */
export const prefetchPageChunk = (page: PageId) => {
  if (page === 'home' || prefetchedSet.has(page)) return;
  if (page in pageLoaders) {
    prefetchedSet.add(page);
    void pageLoaders[page as keyof typeof pageLoaders]().catch(() => {
      prefetchedSet.delete(page);
    });
  }
};

/**
 * Prefetches secondary route chunks gently during browser idle time
 * so navigating between pages feels instantaneous without skeleton flashes.
 */
export const prefetchIdlePages = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const priorityOrder: PageId[] = [
    'services',
    'projects',
    'materials',
    'about',
    'contact',
    'certificates',
    'enquiry',
    'gallery',
  ];

  // Respect Save-Data / very slow connections
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  if (conn?.saveData || conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
    return () => {};
  }

  let cancelled = false;
  let idleHandle: number | null = null;
  let timerHandle: ReturnType<typeof setTimeout> | null = null;
  let index = 0;

  const loadNext = () => {
    if (cancelled || index >= priorityOrder.length) return;
    prefetchPageChunk(priorityOrder[index++]);
    scheduleNext();
  };

  const scheduleNext = () => {
    if (cancelled || index >= priorityOrder.length) return;
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (typeof win.requestIdleCallback === 'function') {
      idleHandle = win.requestIdleCallback(loadNext, { timeout: 2000 });
    } else {
      timerHandle = setTimeout(loadNext, 220);
    }
  };

  timerHandle = setTimeout(scheduleNext, 1000);

  return () => {
    cancelled = true;
    if (timerHandle !== null) clearTimeout(timerHandle);
    const win = window as Window & { cancelIdleCallback?: (id: number) => void };
    if (idleHandle !== null && typeof win.cancelIdleCallback === 'function') {
      win.cancelIdleCallback(idleHandle);
    }
  };
};
