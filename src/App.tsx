import React, { useState, useEffect } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GalleryPage } from './pages/GalleryPage';
import { MaterialSupplyPage } from './pages/MaterialSupplyPage';
import { InfrastructurePage } from './pages/InfrastructurePage';
import { CertificatesPage } from './pages/CertificatesPage';
import { ContactPage } from './pages/ContactPage';
import { EnquiryPage } from './pages/EnquiryPage';
import { FloatingActions } from './components/FloatingActions';
import { COMPANY_INFO } from './data/siteData';
import { PageSkeleton } from './components/PageSkeleton';
import { useGlobalScrollReveal } from './components/ScrollReveal';

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

  // Check pathname: /about or /projects/proj-mall-01
  if (typeof window !== 'undefined') {
    const rawPath = window.location.pathname.replace(/^\/?/, '').trim();
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

  // Initialize smooth scroll reveal animations across all pages
  useGlobalScrollReveal(currentPage);

  const [selectedItemTarget, setSelectedItemTarget] = useState<string | null>(initialRoute.itemId);

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
  const handleNavigate = (page: PageId, itemId?: string) => {
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
  };

  const [isAtBottom, setIsAtBottom] = useState(false);

  // Scroll listener for back to top button and footer collision detection
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Check if user is near the footer to avoid double-dock overlapping
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 350;
      setIsAtBottom(scrollPosition >= threshold);
    };
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        </div>
      </main>

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
