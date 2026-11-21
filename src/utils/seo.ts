import { PageId } from '../components/Navbar';

interface PageMetadata {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
}

const SITE_NAME = 'Pioneer Fab Tech';
const BASE_DOMAIN = 'https://pioneerfabtech.com';

const PAGE_SEO_DATA: Record<PageId, PageMetadata> = {
  home: {
    title: 'Pioneer Fab Tech - Industrial & Architectural Metal Fabrication',
    description: 'Pioneer Fab Tech is a premier industrial & architectural metal fabrication company in Mumbai & Vasai-Virar with 15+ years experience. Specializing in spiral staircases, laser cutting, CNC bending, SS & glass railings, architectural facades, and luxury lift cladding. Call +91 91722 09282.',
    keywords: 'metal fabrication Mumbai, laser cutting Vasai Virar, spiral staircase fabrication Mumbai, SS railing manufacturers, architectural metal facade Mumbai, industrial sheet metal fabrication, CNC bending Vasai, Hyatt hotel fabrication contractor, stainless steel fabrication, heavy steel sheds Palghar',
    canonical: `${BASE_DOMAIN}/`,
  },
  about: {
    title: 'About Us | Pioneer Fab Tech - 15+ Years Industrial & Architectural Fabrication Excellence',
    description: 'Learn about Pioneer Fab Tech: ISO-compliant metal fabrication facility in Vasai, Maharashtra with 15+ years track record, 500+ completed projects, state-of-the-art machinery, and 50+ master craftspersons.',
    keywords: 'about Pioneer Fab Tech, metal fabrication company Vasai, architectural metal fabricators Mumbai, industrial engineering Maharashtra, metal fabrication workshop Vasai East',
    canonical: `${BASE_DOMAIN}/about`,
  },
  services: {
    title: 'Our Services | Spiral Staircases, CNC Laser Cutting & SS Railings - Pioneer Fab Tech',
    description: 'Explore precision metal fabrication services: architectural spiral & helical staircases, CNC fiber laser cutting, SS 304/316 & glass railings, luxury facade cladding, and heavy industrial steel sheds.',
    keywords: 'metal fabrication services Mumbai, laser cutting service Vasai, spiral staircase maker Mumbai, SS glass railing installation, lift cladding contractors, industrial PEB shed fabrication',
    canonical: `${BASE_DOMAIN}/services`,
  },
  projects: {
    title: 'Projects Portfolio | Hyatt Hotels, Malls & Luxury Villas - Pioneer Fab Tech',
    description: 'Browse 500+ successful projects completed by Pioneer Fab Tech: Hyatt Regency Delhi, Hyatt Place Pune, Grand Hyatt Gurgaon, premium retail malls, luxury bungalows, and industrial complexes.',
    keywords: 'Pioneer Fab Tech projects, Hyatt hotel fabrication Delhi Pune, luxury spiral staircase projects, commercial metal facade projects, hotel lift cladding contractor',
    canonical: `${BASE_DOMAIN}/projects`,
  },
  gallery: {
    title: 'Work Gallery | 60+ Real Fabrication Project Photos - Pioneer Fab Tech',
    description: 'Explore our comprehensive photo gallery of authentic fabrication work: architectural spiral staircases, laser cut decorative jaali, designer gates, lift cladding, and SS railing installations.',
    keywords: 'metal fabrication photo gallery, spiral staircase designs, laser cut jaali photos, stainless steel railing gallery, lift cladding pictures Mumbai',
    canonical: `${BASE_DOMAIN}/gallery`,
  },
  materials: {
    title: 'Material Supply | Prime Certified SS, MS, Aluminum & Brass - Pioneer Fab Tech',
    description: 'Certified industrial metal material supply in Mumbai & Vasai: SS 304/316 coils, plates, pipes, MS structural beams, CR/HR sheets, aluminum sections, brass bars, and custom cut-to-size metals.',
    keywords: 'stainless steel supplier Vasai Mumbai, SS 304 316 coil supplier, mild steel plate supplier Maharashtra, aluminum section distributor, industrial metal supply Mumbai',
    canonical: `${BASE_DOMAIN}/materials`,
  },
  infrastructure: {
    title: 'Factory Infrastructure & Machinery | CNC Laser & Bending - Pioneer Fab Tech',
    description: 'Tour Pioneer Fab Tech manufacturing plant in Vasai East: high-power fiber laser cutting machines, CNC hydraulic press brakes, argon TIG/MIG welding lines, and rigorous QA inspection bays.',
    keywords: 'metal fabrication factory Vasai, fiber laser cutting machine, CNC press brake bending Mumbai, argon welding workshop, industrial fabrication plant Maharashtra',
    canonical: `${BASE_DOMAIN}/infrastructure`,
  },
  certificates: {
    title: 'Certifications & Quality Compliance | ISO Standard - Pioneer Fab Tech',
    description: 'Pioneer Fab Tech adheres to ISO quality standards, Mill Test Certificates (MTC), Welding Procedure Specifications (WPS), and strict industrial safety protocols for all projects.',
    keywords: 'Pioneer Fab Tech certificates, ISO certified metal fabricator Mumbai, welding quality standards, metal mill test certificate, industrial compliance',
    canonical: `${BASE_DOMAIN}/certificates`,
  },
  contact: {
    title: 'Contact Us & Free Quote | Vasai East, Palghar, Mumbai - Pioneer Fab Tech',
    description: 'Contact Pioneer Fab Tech for immediate fabrication estimates, technical consultation, and site inspections. Phone: +91 91722 09282 / +91 90212 91702. Located at Fatherwadi, Vasai East.',
    keywords: 'contact Pioneer Fab Tech, metal fabricator phone number Mumbai, Vasai metal fabrication contact, free fabrication quote Mumbai Palghar',
    canonical: `${BASE_DOMAIN}/contact`,
  },
  enquiry: {
    title: 'Request a Free Quote | Architectural & Industrial Fabrication - Pioneer Fab Tech',
    description: 'Submit your architectural CAD drawings, BOQ, or metal fabrication specifications for a free instant consultation and fast commercial estimate from Pioneer Fab Tech engineers.',
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
