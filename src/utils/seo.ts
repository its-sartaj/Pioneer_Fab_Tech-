import { PageId } from '../components/Navbar';

interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

export const SITE_NAME = 'Pioneer Fab Tech';
export const BASE_DOMAIN = 'https://www.pioneerfabtech.com';

export const PAGE_SEO_DATA: Record<PageId, PageMetadata> = {
  home: {
    title: 'Pioneer Fab Tech | Metal Fabrication, Laser Cutting & SS Railings in Mumbai, Vasai',
    description: 'Pioneer Fab Tech in Mumbai & Vasai-Virar: 14+ years in spiral staircases, CNC laser cutting, SS & glass railings, facades & metal supply. +91 90295 55233.',
    keywords: 'metal fabrication Mumbai, laser cutting Vasai Virar, spiral staircase fabrication Mumbai, SS railing manufacturers, architectural metal facade Mumbai, industrial sheet metal fabrication, CNC bending Vasai, Hyatt hotel fabrication contractor, stainless steel fabrication, heavy steel sheds Palghar',
    canonical: `${BASE_DOMAIN}/`,
  },
  about: {
    title: 'About Us | Pioneer Fab Tech - 14+ Years Industrial & Architectural Fabrication Excellence',
    description: 'About Pioneer Fab Tech: ISO 9001 metal fabrication workshop in Vasai-Virar with 14+ years experience, 850+ projects delivered, and 620+ satisfied clients.',
    keywords: 'about Pioneer Fab Tech, metal fabrication company Vasai, architectural metal fabricators Mumbai, industrial engineering Maharashtra, metal fabrication workshop Vasai East',
    canonical: `${BASE_DOMAIN}/about`,
  },
  services: {
    title: 'Our Services | Spiral Staircases, CNC Laser Cutting & SS Railings - Pioneer Fab Tech',
    description: 'Explore precision fabrication: architectural spiral staircases, CNC laser cutting, SS 304/316 & glass railings, elevator cladding, and steel PEB sheds.',
    keywords: 'metal fabrication services Mumbai, laser cutting service Vasai, spiral staircase maker Mumbai, SS glass railing installation, lift cladding contractors, industrial PEB shed fabrication',
    canonical: `${BASE_DOMAIN}/services`,
  },
  projects: {
    title: 'Projects Portfolio | Hyatt Hotels, Malls & Luxury Villas - Pioneer Fab Tech',
    description: 'Browse 850+ completed projects by Pioneer Fab Tech: Hyatt Regency Delhi, Hyatt Place Pune, Grand Hyatt Gurgaon, malls, and luxury architectural work.',
    keywords: 'Pioneer Fab Tech projects, Hyatt hotel fabrication Delhi Pune, luxury spiral staircase projects, commercial metal facade projects, hotel lift cladding contractor',
    canonical: `${BASE_DOMAIN}/projects`,
  },
  gallery: {
    title: 'Work Gallery | Real Fabrication Project Photos - Pioneer Fab Tech',
    description: 'Explore our real fabrication gallery: architectural spiral staircases, CNC laser cut jaali, luxury gates, elevator cladding, and SS glass railings.',
    keywords: 'metal fabrication photo gallery, spiral staircase designs, laser cut jaali photos, stainless steel railing gallery, lift cladding pictures Mumbai',
    canonical: `${BASE_DOMAIN}/gallery`,
  },
  materials: {
    title: 'Material Supply | Prime Certified SS, MS, Aluminum & Brass - Pioneer Fab Tech',
    description: 'Certified metal supply in Mumbai & Vasai: SS 304/316 coils, sheets, pipes, round & flat bars, structural beams, copper, aluminium, and titanium products.',
    keywords: 'stainless steel supplier Vasai Mumbai, SS 304 316 coil supplier, mild steel plate supplier Maharashtra, aluminum section distributor, industrial metal supply Mumbai',
    canonical: `${BASE_DOMAIN}/materials`,
  },
  infrastructure: {
    title: 'Factory Infrastructure & Machinery | CNC Laser & Bending - Pioneer Fab Tech',
    description: 'Tour Pioneer Fab Tech Vasai workshop: CNC fiber laser cutting machines, hydraulic press brakes, argon TIG/MIG welding bays, and 5-ton overhead handling.',
    keywords: 'metal fabrication factory Vasai, fiber laser cutting machine, CNC press brake bending Mumbai, argon welding workshop, industrial fabrication plant Maharashtra',
    canonical: `${BASE_DOMAIN}/infrastructure`,
  },
  certificates: {
    title: 'Certifications & Quality Compliance | ISO Standard - Pioneer Fab Tech',
    description: 'Pioneer Fab Tech official compliance: Udyam MSME registration, GSTIN, PTEC credentials, Mill Test Certificates (MTC), and ISO 9001 fabrication quality.',
    keywords: 'Pioneer Fab Tech certificates, ISO certified metal fabricator Mumbai, welding quality standards, metal mill test certificate, industrial compliance',
    canonical: `${BASE_DOMAIN}/certificates`,
  },
  contact: {
    title: 'Contact Us & Free Quote | Vasai-Virar, Palghar, Mumbai - Pioneer Fab Tech',
    description: 'Contact Pioneer Fab Tech at Jay Ambe Chawl Lake, Vasai-Virar, Maharashtra for quotes, drawings, and site visits. Call or WhatsApp +91 90295 55233 today.',
    keywords: 'contact Pioneer Fab Tech, metal fabricator phone number Mumbai, Vasai metal fabrication contact, free fabrication quote Mumbai Palghar',
    canonical: `${BASE_DOMAIN}/contact`,
  },
  enquiry: {
    title: 'Request a Free Quote | Architectural & Industrial Fabrication - Pioneer Fab Tech',
    description: 'Submit your CAD drawings, dimensions, or fabrication BOQ to Pioneer Fab Tech for a fast project estimate and free site consultation across Mumbai & Thane.',
    keywords: 'metal fabrication estimate, request fabrication quote Mumbai, architectural metal quote, laser cutting rate Vasai, spiral staircase price quote',
    canonical: `${BASE_DOMAIN}/enquiry`,
  },
};

/**
 * Updates DOM head metadata dynamically on page navigation for search engine crawlers and browser tabs
 */
export function updatePageSeo(page: PageId, projectTitle?: string | null): void {
  const meta = PAGE_SEO_DATA[page] || PAGE_SEO_DATA.home;

  const title = projectTitle ? `${projectTitle} | Project Case Study - ${SITE_NAME}` : meta.title;
  document.title = title;

  // Helper to safely set or create meta tag
  const setMeta = (nameAttr: string, nameValue: string, content: string) => {
    let el = document.querySelector<HTMLMetaElement>(`meta[${nameAttr}="${nameValue}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, nameValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Standard Meta Description & Keywords
  setMeta('name', 'description', meta.description);
  setMeta('name', 'keywords', meta.keywords);

  // OpenGraph Tags
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', meta.canonical);
  setMeta('property', 'og:site_name', SITE_NAME);

  // App & Site Identification
  setMeta('name', 'application-name', SITE_NAME);

  // Twitter Tags
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', meta.description);

  // Canonical Link
  let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', meta.canonical);
}
