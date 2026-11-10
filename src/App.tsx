import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { FloatingActions } from './components/FloatingActions';
import { PageSkeleton } from './components/PageSkeleton';
import { useGlobalScrollReveal } from './components/ScrollReveal';

// Code-split secondary pages (especially GSAP-powered Gallery) for fast mobile initial load
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((m) => ({ default: m.ProjectsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then((m) => ({ default: m.GalleryPage })));
const MaterialSupplyPage = lazy(() => import('./pages/MaterialSupplyPage').then((m) => ({ default: m.MaterialSupplyPage })));
const InfrastructurePage = lazy(() => import('./pages/InfrastructurePage').then((m) => ({ default: m.InfrastructurePage })));
const CertificatesPage = lazy(() => import('./pages/CertificatesPage').then((m) => ({ default: m.CertificatesPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const EnquiryPage = lazy(() => import('./pages/EnquiryPage').then((m) => ({ default: m.EnquiryPage })));

const VALID_PAGES: PageId[] = [
  'home', 'about', 'services', 'projects', 'gallery', 
  'materials', 'infrastructure', 'certificates', 'contact', 'enquiry'
];

const parseUrlRoute = (): { page: PageId; itemId: string | null } => {
  // Check hash: #projects/proj-mall-01 or #projects
  const rawHash = typeof window !== 'undefined' ? window.location.hash.replace(/^#\/?/, '').trim() : '';
  if (rawHash) {
    const parts = rawHash.split('/');
    const pageCandidate = parts[0].toLowerCase() as PageId;
    const itemCandidate = parts.slice(1).join('/') || null;
    if (VALID_PAGES.includes(pageCandidate)) {
      return { page: pageCandidate, itemId: itemCandidate };
    }
  }

  // Check pathname: /about or /Pioneer_Fab_Tech-/about or /projects/proj-mall-01
  if (typeof window !== 'undefined') {
    const basePath = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');
    let pathname = window.location.pathname;
    if (basePath && basePath !== '/' && pathname.startsWith(basePath)) {
      pathname = pathname.slice(basePath.length);
    }
    const rawPath = pathname.replace(/^\/?/, '').trim();
    if (rawPath) {
      const parts = rawPath.split('/');
      const pageCandidate = parts[0].toLowerCase() as PageId;
      const itemCandidate = parts.slice(1).join('/') || null;
      if (VALID_PAGES.includes(pageCandidate)) {
        return { page: pageCandidate, itemId: itemCandidate };
      }
    }
  }

  // Check search params: ?project=proj-mall-01 or ?material=ss-coil
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const qProj = params.get('project');
    if (qProj) return { page: 'projects', itemId: qProj };
    const qMat = params.get('material');
    if (qMat) return { page: 'materials', itemId: qMat };
    const qPage = params.get('page') as PageId;
    const qItem = params.get('item') || params.get('id');
    if (qPage && VALID_PAGES.includes(qPage)) {
      return { page: qPage, itemId: qItem };
    }
  }

  return { page: 'home', itemId: null };
};

export default function App() {
  const initialRoute = parseUrlRoute();
  const [currentPage, setCurrentPage] = useState<PageId>(initialRoute.page);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [selectedItemTarget, setSelectedItemTarget] = useState<string | null>(initialRoute.itemId);

  // Initialize smooth scroll reveal animations across all pages
  useGlobalScrollReveal(`${currentPage}:${selectedItemTarget || ''}`);

  // Sync URL on browser back/forward or direct link entry
  useEffect(() => {
    const onHashOrPop = () => {
      const route = parseUrlRoute();
      setCurrentPage(route.page);
      setSelectedItemTarget(route.itemId);
    };

    window.addEventListener('hashchange', onHashOrPop);
    window.addEventListener('popstate', onHashOrPop);
    return () => {
      window.removeEventListener('hashchange', onHashOrPop);
      window.removeEventListener('popstate', onHashOrPop);
    };
  }, []);

  // Instant page switching with distinct URL routing for every page and project
  const handleNavigate = useCallback((page: PageId, itemId?: string) => {
    setSelectedItemTarget(itemId || null);
    setCurrentPage(page);

    const targetHash = itemId ? `#${page}/${itemId}` : (page === 'home' ? '' : `#${page}`);
    const currentHash = window.location.hash.replace(/^#\/?/, '').trim();
    const cleanTarget = targetHash.replace(/^#\/?/, '').trim();

    if (currentHash !== cleanTarget) {
      if (!targetHash) {
        window.history.pushState(null, '', window.location.pathname);
      } else {
        window.history.pushState(null, '', targetHash);
      }
    }

    if (!itemId) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, []);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const footerSentinelRef = useRef<HTMLDivElement | null>(null);

  // Off-main-thread IntersectionObserver for footer proximity + rAF-throttled scroll top check
  useEffect(() => {
    let rafId: number | null = null;
    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const shouldShow = window.scrollY > 400;
        setShowScrollTop((prev) => (prev === shouldShow ? prev : shouldShow));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    let footerObserver: IntersectionObserver | null = null;
    const sentinel = footerSentinelRef.current;
    if (sentinel && 'IntersectionObserver' in window) {
      footerObserver = new IntersectionObserver(
        (entries) => {
          const nearBottom = entries[0]?.isIntersecting ?? false;
          setIsAtBottom((prev) => (prev === nearBottom ? prev : nearBottom));
        },
        { rootMargin: '0px 0px 220px 0px', threshold: 0 }
      );
      footerObserver.observe(sentinel);
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      footerObserver?.disconnect();
    };
  }, [currentPage]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 relative">
      
      {/* Top Navigation Bar with White background for logo */}
      <Navbar 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        onMobileMenuToggle={setIsMobileMenuOpen}
      />

      {/* Main Page Content - Fast, smooth transition with instant loading */}
      <main className="flex-1">
        <div key={currentPage} className="animate-in fade-in duration-150 ease-out">
          <Suspense fallback={<PageSkeleton />}>
            {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
            {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
            {currentPage === 'services' && (
              <ServicesPage onNavigate={handleNavigate} selectedItemId={selectedItemTarget} />
            )}
            {currentPage === 'projects' && (
              <ProjectsPage onNavigate={handleNavigate} selectedItemId={selectedItemTarget} />
            )}
            {currentPage === 'gallery' && <GalleryPage onNavigate={handleNavigate} />}
            {(currentPage === 'materials' || currentPage === 'infrastructure') && (
              <MaterialSupplyPage onNavigate={handleNavigate} selectedItemId={selectedItemTarget} />
            )}
            {currentPage === 'certificates' && <CertificatesPage onNavigate={handleNavigate} />}
            {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
            {currentPage === 'enquiry' && <EnquiryPage />}
          </Suspense>
        </div>
      </main>

      {/* Lightweight sentinel to detect footer approach without scrollHeight reflow */}
      <div ref={footerSentinelRef} className="h-px w-full pointer-events-none" aria-hidden="true" />

      {/* Footer with exact copyright attribution */}
      <Footer onNavigate={handleNavigate} />

      {/* Professional Floating Action Buttons: Direct WhatsApp & Phone */}
      <FloatingActions 
        showScrollTop={showScrollTop}
        isAtBottom={isAtBottom}
        isMobileMenuOpen={isMobileMenuOpen}
        onScrollToTop={scrollToTop}
      />

    </div>
  );
}
